import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import { GoogleGenAI } from '@google/genai';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 지수형 백오프 로직(Retry-After 메타데이터 + 지터 포함)이 포함된 Gemini API 호출 래퍼
async function callGeminiWithRetry(prompt, maxRetries = 3) {
  const defaultBackoffDelays = [30000, 60000, 120000]; // 30초, 60초, 120초
  
  // 지터(jitter) 추가: ±10% 랜덤 변동
  const addJitter = (delayMs) => {
    const jitterPercent = 0.1; // 10%
    const jitterRange = delayMs * jitterPercent;
    const randomJitter = (Math.random() - 0.5) * 2 * jitterRange;
    return Math.max(1000, delayMs + randomJitter); // 최소 1초 보장
  };
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Google Search Grounding 활성화
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      
      return response;
    } catch (error) {
      const statusCode = error.status || error.code;
      const isRateLimitError = statusCode === 429 || statusCode === 503 || 
                               error.message?.includes('429') || 
                               error.message?.includes('503') ||
                               error.message?.includes('RESOURCE_EXHAUSTED') ||
                               error.message?.includes('quota');
      
      if (isRateLimitError && attempt < maxRetries) {
        // Retry-After 메타데이터 확인 (초 단위)
        let retryAfter = null;
        if (error.headers?.['retry-after']) {
          const retryAfterValue = error.headers['retry-after'];
          // 숫자인 경우 초, 날짜인 경우 ISO 8601 형식
          if (!isNaN(retryAfterValue)) {
            retryAfter = parseInt(retryAfterValue) * 1000;
          } else {
            const retryDate = new Date(retryAfterValue);
            if (!isNaN(retryDate.getTime())) {
              retryAfter = Math.max(0, retryDate.getTime() - Date.now());
            }
          }
        }
        
        // retryDelay 또는 다른 메타데이터 확인
        if (!retryAfter && error.retryDelay) {
          retryAfter = error.retryDelay;
        }
        
        // 메타데이터가 있으면 사용, 없으면 기본값 사용 (지터 추가)
        const waitTime = retryAfter || addJitter(defaultBackoffDelays[attempt]);
        const waitSecs = (waitTime / 1000).toFixed(1);
        
        console.log(`⚠️ API 과부하 (상태: ${statusCode}). ${waitSecs}초 후 ${attempt + 1}차 재시도합니다...`);
        
        // 계산된 시간 대기
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else if (isRateLimitError) {
        console.error(`❌ API 과부하로 인해 최대 재시도 횟수(${maxRetries})를 초과했습니다. 발행을 스킵합니다.`);
        throw new Error('API_RETRY_EXHAUSTED: 최대 재시도 횟수 초과');
      } else {
        // Rate limit이 아닌 다른 에러는 즉시 throw
        throw error;
      }
    }
  }
}

// verified_programs.json에서 오늘의 슬롯에 맞는 프로그램 선택
async function getInformationKeyword() {
  const filePath = path.join(__dirname, 'verified_programs.json');
  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'));

  const now = new Date();
  const kstNow = new Date(now.getTime() + 9 * 3600 * 1000);
  const kstHour = kstNow.getUTCHours();
  const slotIndex = (kstHour >= 5 && kstHour < 14) ? 0 : 1;

  const yearStart = new Date(Date.UTC(kstNow.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((kstNow - yearStart) / 86400000) + 1;

  const idx = (dayOfYear * 2 + slotIndex) % data.length;
  const slot = slotIndex === 0 ? '오전' : '오후';
  console.log(`📅 [${slot} 슬롯] day=${dayOfYear}, idx=${idx} → ${data[idx].title}`);
  return data[idx];
}

// 정부 공식 사이트에서 실제 본문 텍스트 추출 (보조 수단)
async function fetchSourceContent(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9',
      },
    });
    clearTimeout(timeout);
    const html = await res.text();
    const $ = cheerio.load(html);
    $('script, style, nav, footer, header, iframe, noscript').remove();
    const text = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 6000);
    console.log(`✅ 출처 페이지 로드 성공 (${text.length}자)`);
    return text || null;
  } catch (e) {
    console.log(`⚠️ 출처 페이지 가져오기 실패 (${url}): ${e.message}`);
    return null;
  }
}

// 응답 텍스트에서 JSON 블록 추출
function extractJson(text) {
  // 마크다운 코드블록 제거
  const stripped = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '');
  // 첫 번째 { 부터 마지막 } 까지 추출
  const start = stripped.indexOf('{');
  const end = stripped.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('응답에서 JSON을 찾을 수 없습니다');
  return JSON.parse(stripped.slice(start, end + 1));
}

// 콘텐츠 품질 종합 검증 헬퍼 함수
function validateContentQuality(htmlBody) {
  const validationResults = {
    passed: true,
    reasons: []
  };

  // 1. HTML 태그 제거 후 순문본 길이 확인
  const plainText = htmlBody
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .trim();
  
  const plainTextLength = plainText.length;
  const minTextLength = 2800; // 최소 2,800자
  
  if (plainTextLength < minTextLength) {
    validationResults.passed = false;
    validationResults.reasons.push(
      `📏 순문본 길이 미달: ${plainTextLength}자 (최소: ${minTextLength}자)`
    );
  }

  // 2. H2 섹션 개수 확인
  const h2Count = (htmlBody.match(/<h2[^>]*>/gi) || []).length;
  const minH2 = 4; // 최소 4개 필수
  
  if (h2Count < minH2) {
    validationResults.passed = false;
    validationResults.reasons.push(
      `📚 H2 섹션 부족: ${h2Count}개 (최소: ${minH2}개)`
    );
  }

  // 3. FAQ 섹션 존재 여부 확인
  const faqPattern = /(<h2[^>]*>.*?(FAQ|자주.*?묻|frequently|question).*?<\/h2>|<h3[^>]*>.*?Q\d+\.|Q\d+\.)/gi;
  const hasFaqSection = faqPattern.test(htmlBody);
  
  if (!hasFaqSection) {
    validationResults.passed = false;
    validationResults.reasons.push(
      `❓ FAQ 섹션 없음: "자주 묻는 질문" 또는 Q1, Q2 등의 Q&A 구조 필요`
    );
  }

  // 4. 비교표(table) 존재 여부 확인
  const hasTable = /<table[^>]*>.*?<\/table>/is.test(htmlBody);
  
  if (!hasTable) {
    validationResults.passed = false;
    validationResults.reasons.push(
      `📊 비교표 없음: 지원 내용이나 혜택 비교를 위한 <table> 필요`
    );
  }

  // 5. 결론/요약 섹션 존재 여부 확인
  const hasConclusionSection = /(<h2[^>]*>.*?(마무리|결론|요약|Summary|Conclusion|마지막).*?<\/h2>|<h2[^>]*>✨|<p[^>]*>.*?(이.*정보.*중요|행동.*유도|신청.*시간|확인.*권장).*?<\/p>)/gi.test(htmlBody);
  
  if (!hasConclusionSection) {
    validationResults.passed = false;
    validationResults.reasons.push(
      `📝 결론/요약 섹션 없음: "마무리" 또는 행동 유도 문구 필요`
    );
  }

  // 6. 기존 flagCount 검증 (약한 정보 표현)
  const qualityFlags = [
    "확인할 수 없습니다",
    "명시되어 있지 않습니다",
    "참고 자료에",
    "제공된 정보로"
  ];
  const flagCount = qualityFlags.reduce((count, flag) => {
    const matches = htmlBody.match(new RegExp(flag, 'g'));
    return count + (matches ? matches.length : 0);
  }, 0);
  
  if (flagCount >= 3) {
    validationResults.passed = false;
    validationResults.reasons.push(
      `⚠️ 약한 정보 표현 과다: ${flagCount}회 (한계점: 3회 이상)`
    );
  }

  return validationResults;
}

// Gemini로 Google Search Grounding 기반 블로그 포스트 생성
async function generateContent(program, sourceContent) {
  console.log(`✍️ '${program.title}' 콘텐츠 생성 중 (Google Search Grounding)...`);

  const today = new Date().toISOString().slice(0, 10);

  const prompt = `당신은 한국 정부 정책과 복지 혜택을 전문적으로 정리하는 시니어 에디터입니다. 독자 연령대는 20대부터 60대까지 폭넓으며, 부모님 세대도 편하게 읽을 수 있도록 친절하고 명확한 문장을 사용합니다.

[Phase 2: 콘텐츠 깊이 확장 모드]
이 글은 단순한 정보 전달을 넘어 깊이 있는 가이드 문서입니다. 각 섹션은 실제 신청자의 의문을 충분히 해결할 수 있는 수준의 상세함으로 작성하세요.
- 총 분량: 3,000 ~ 5,000자 범위의 풍부한 내용
- 각 H2 섹션: 최소 300자 이상의 심층 설명
- 구체적 예시, 실제 사례, 숫자 기반 비교표 필수 포함

[현재 정보]
- 현재 연도: 2026년
- 작성 일자: ${today}

[작성 대상 프로그램]
- 제목: ${program.title}
- 카테고리: ${program.category}
- 대상: ${program.targetAudience}
- 핵심 요약 (검증된 정보): ${program.coreSummary}
- 공식 출처: ${program.sourceUrl} (${program.officialSiteName})

[참고 자료]
${sourceContent ? `공식 사이트에서 가져온 내용:\n${sourceContent}` : '공식 사이트 자동 fetch는 실패. Google 검색으로 최신 정보 확인 후 작성하세요.'}

[필수 작업]
Google 검색 도구를 활용하여 위 프로그램의 2026년 현재 시점 정보를 검색하고, 다음 항목들에 대한 구체적이고 정확한 정보를 확보한 뒤 작성하세요:
- 정확한 지원 금액 (한도, 이자율 등)
- 자격 요건 (소득, 연령, 거주지 등)
- 신청 기간 (2026년 기준)
- 신청 방법 및 필요 서류
- 자주 묻는 질문 (FAQ)

[작성 규칙]
1. 추측 금지: Google 검색으로 확인한 정보만 사용. 확인 불가한 부분은 "공식 사이트에서 최신 정보 확인 권장"으로 짧게 표기.
2. 분량: 본문 3,000 ~ 5,000자 이상 (한글 기준) - 단순 연장 아님, 구체적 정보로 채울 것
3. 문체: 친절하고 명확. 어려운 행정 용어는 풀어서 설명.
4. 신뢰성: 검색에서 발견한 출처를 본문에 자연스럽게 인용
5. 구조 강제: 다음 H2 섹션들을 반드시 포함하고 각각 300자 이상 상세 작성할 것

[필수 HTML 구조 - Phase 2 확장 버전]

<h1>[2026년 명시한 매력적 제목 40-60자]</h1>

<div class="summary-box">
  <h3>📌 한눈에 보는 핵심 요약</h3>
  <ul>
    <li><strong>지원 대상:</strong> [2-3개 키워드]</li>
    <li><strong>지원 금액/혜택:</strong> [핵심 숫자]</li>
    <li><strong>신청 기간:</strong> [기간 또는 상시]</li>
    <li><strong>신청 방법:</strong> [경로 한 줄]</li>
  </ul>
</div>

<p>[도입부 2-3문장 - 누가 왜 이 정보를 알아야 하는지]</p>

<h2>목차</h2>
<ul class="toc">
<li><a href="#section1">1. 지원 대상 및 자격 요건</a></li>
<li><a href="#section2">2. 지원 내용 및 구체적 혜택</a></li>
<li><a href="#section3">3. 신청 방법 및 필요 서류</a></li>
<li><a href="#section4">4. 자주 묻는 질문 (FAQ)</a></li>
<li><a href="#section5">5. 꿀팁과 주의사항</a></li>
</ul>

<h2 id="section1">🎯 지원 대상 및 자격 요건 (심층 분석)</h2>
<p>[프로그램이 대상으로 하는 집단의 구체적 설명 - 최소 400자 이상]</p>
<h3>📋 기본 자격 요건</h3>
<ul>[소득 기준, 연령대, 거주지, 직업 등 상세히 나열]</ul>
<h3>📌 추가 요건 및 예외</h3>
<ul>[추가 조건, 예외 사항, 제외 대상 등 구체적 예시 포함]</ul>

<h2 id="section2">💰 지원 내용 및 구체적 혜택</h2>
<p>[지원 혜택의 전체 범위와 규모에 대한 상세 설명 - 최소 400자 이상]</p>
<h3>💵 금액 및 한도</h3>
<ul>[정확한 지원금 규모, 최대 한도, 이자율(해당시), 상환 조건 등]</ul>
<h3>📊 혜택 비교표</h3>
<table>[프로그램별 비교, 상황별 혜택 차이 등을 표 형식으로]</table>
<h3>✅ 추가 혜택 및 특전</h3>
<ul>[부가적 혜택, 세액 공제, 우대 조건 등]</ul>

<h2 id="section3">📝 신청 방법 및 필요 서류</h2>
<p>[신청 절차의 전체 흐름에 대한 상세 가이드 - 최소 400자 이상]</p>
<h3>🔗 신청 경로</h3>
<ol>
<li>[1단계 상세 설명]</li>
<li>[2단계 상세 설명]</li>
<li>[3단계 상세 설명]</li>
<li>[4단계 이상 필요시 추가]</li>
</ol>
<h3>📄 필요 서류 체크리스트</h3>
<ul>[필수 서류 및 첨부 파일 상세 나열]</ul>
<h3>⏰ 신청 기간 및 접수 방법</h3>
<ul>[2026년 기준 정확한 기간, 온라인/방문/우편 등 접수 방법]</ul>

<h2 id="section4">❓ 자주 묻는 질문 (FAQ)</h2>
<h3>Q1. [사용자가 자주 묻는 질문 1 - 300자 이상 답변 포함]</h3>
<p>[구체적이고 명확한 답변]</p>
<h3>Q2. [사용자가 자주 묻는 질문 2 - 300자 이상 답변 포함]</h3>
<p>[구체적이고 명확한 답변]</p>
<h3>Q3. [사용자가 자주 묻는 질문 3 - 300자 이상 답변 포함]</h3>
<p>[구체적이고 명확한 답변]</p>
<h3>Q4. [해당 프로그램 특수 질문 - 선택]</h3>
<p>[상세한 답변]</p>

<h2 id="section5">💡 꿀팁과 주의사항</h2>
<p>[실제 신청자들이 놓치기 쉬운 포인트 및 프로 팁 - 최소 300자 이상]</p>
<h3>⚡ 신청 전 꼭 확인하세요</h3>
<ul>[신청 전 필독 항목들]</ul>
<h3>⚠️ 흔한 실수와 거절 사유</h3>
<ul>[실제 거절 사례, 피해야 할 실수]</ul>

<h2>✨ 마무리</h2>
<p>[이 정보가 왜 중요한지, 행동 유도 메시지 - 최소 200자 이상]</p>

<p class="source-link">📌 자세한 내용 및 최신 정보: <a href="${program.sourceUrl}" target="_blank" rel="noopener">${program.title} 공식 페이지 (${program.officialSiteName})</a></p>

[이미지 프롬프트 규칙]
- 본문 주제를 시각적으로 직접 표현하는 구체적이고 실사적인 영문 프롬프트
- 실존 인물 묘사 금지, 브랜드 로고 금지
- "abstract", "metaphorical", "symbolic", "generic" 같은 표현 절대 사용 금지
- 한국적 맥락이 자연스러울 때는 "Korean" 키워드 포함
- 반드시 마지막에 스타일 키워드 포함: "photorealistic, editorial photography, professional composition, cinematic lighting, high detail, 8k"

[출력 형식 - 반드시 JSON]
{
  "title": "h1 텍스트만 추출",
  "imagePrompt": "영문 이미지 프롬프트",
  "htmlContent": "전체 HTML 본문"
}`;

  try {
    // Google Search Grounding 활성화 (responseMimeType과 병행 불가하여 수동 JSON 파싱)
    // 지수형 백오프를 포함한 재시도 로직 사용
    const response = await callGeminiWithRetry(prompt, 3);

    const data = extractJson(response.text);
    const cleanedHtml = data.htmlContent.replace(/<\/?(html|head|body)[^>]*>/gi, '').trim();

    const encodedPrompt = encodeURIComponent(data.imagePrompt);
    const thumbnailHtml = `<div class="thumb-wrap"><img src="https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&model=flux&nologo=true&enhance=true" alt="${program.title} 관련 이미지" class="thumb-img" /></div>`;

    const css = `<style>
.post-wrap{max-width:720px;margin:0 auto;padding:0 20px;font-family:'Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif;font-size:18px;line-height:1.85;color:#2c2c2c;word-break:keep-all;letter-spacing:-0.3px}
.post-wrap h1{font-size:28px;font-weight:800;line-height:1.4;margin:0 0 20px;color:#1a1a1a}
.post-wrap h2{font-size:22px;font-weight:700;margin:2em 0 0.8em;padding-left:12px;border-left:4px solid #1976d2;color:#1a1a1a}
.post-wrap h3{font-size:19px;font-weight:700;color:#1976d2;margin:1.2em 0 0.6em}
.post-wrap p{margin:0 0 1.5em}
.post-wrap ul,.post-wrap ol{padding-left:1.5em;margin:0 0 1.5em}
.post-wrap li{margin-bottom:0.6em}
.post-wrap strong{color:#d32f2f;font-weight:700}
.post-wrap mark{background:#fff59d;padding:0 4px;border-radius:2px}
.post-wrap a{color:#1976d2;text-decoration:none}
.post-wrap a:hover{text-decoration:underline}
.post-wrap table{width:100%;border-collapse:collapse;margin:1em 0 1.5em;font-size:16px}
.post-wrap th{background:#f5f5f5;padding:12px;border:1px solid #ddd;text-align:left;font-weight:700}
.post-wrap td{padding:12px;border:1px solid #ddd}
.post-wrap tr:nth-child(even) td{background:#fafafa}
.summary-box{background:#fff8e7;border-left:4px solid #f5a623;border-radius:8px;padding:20px 24px;margin:24px 0}
.summary-box h3{margin:0 0 12px;font-size:17px;color:#a0620a}
.summary-box ul{margin:0;padding-left:1.2em}
.summary-box li{margin-bottom:0.5em;font-size:17px}
.thumb-wrap{text-align:center;margin:0 0 24px}
.thumb-img{max-width:480px;width:100%;height:auto;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.12)}
.source-link{margin-top:32px;background:#f5f5f5;padding:16px 20px;border-radius:8px;font-size:16px}
@media(max-width:768px){.post-wrap{padding:0 16px;font-size:17px}.post-wrap h1{font-size:24px}.post-wrap h2{font-size:20px}.thumb-img{max-width:100%}.post-wrap table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch}}
</style>`;

    const styledHtml = `${css}
<div class="post-wrap">
  ${thumbnailHtml}
  ${cleanedHtml}
</div>`;

    return {
      title: data.title,
      htmlBody: styledHtml,
    };
  } catch (error) {
    // 재시도 횟수 초과로 인한 에러는 로그 후 정상 종료
    if (error.message?.includes('API_RETRY_EXHAUSTED')) {
      console.error('🚨 Gemini API 최대 재시도 횟수 초과. 이번 스케줄 발행을 스킵합니다.');
      return null;
    }
    console.error('콘텐츠 생성 실패:', error);
    throw error;
  }
}


// Blogger에 포스트 발행
async function publishToBlogger(newContent, program, blogger, blogId, publishNow) {
  console.log(`💾 Blogger(블로그 ID: ${blogId})에 포스팅 중...`);

  // 콘텐츠 품질 종합 검증 (강화된 로직)
  const qualityValidation = validateContentQuality(newContent.htmlBody);
  
  if (!qualityValidation.passed) {
    console.error(`❌ 콘텐츠 품질 검증 실패. 발행을 스킵합니다.`);
    qualityValidation.reasons.forEach(reason => {
      console.error(`   ${reason}`);
    });
    return; // 안전하게 종료
  }

  const labels = [program.title, program.category, '정부지원금', '정책정보', '혜택안내'];

  try {
    const res = await blogger.posts.insert({
      blogId: blogId,
      isDraft: publishNow === 'false' ? true : false,
      requestBody: {
        title: newContent.title,
        content: newContent.htmlBody,
        labels: labels,
      },
    });
    console.log(`✅ 구글 블로그 발행 성공! 글 확인: ${res.data.url}`);
    return true;
  } catch (error) {
    console.error('❌ 구글 블로그 발행 실패:', error.message);
    throw error;
  }
}

// 메인 실행 함수
async function main() {
  const { GEMINI_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, BLOGGER_BLOG_ID, POST_MODE, CUSTOM_KEYWORD, CUSTOM_TOPIC, PUBLISH_NOW } = process.env;

  if (!GEMINI_API_KEY || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !BLOGGER_BLOG_ID) {
    console.error('❌ API 키 또는 Blogger 인증 정보(.env)가 누락되었습니다. 실행을 중단합니다.');
    process.exit(1);
  }

  // Blogger API 초기화
  const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  const blogger = google.blogger({ version: 'v3', auth: oauth2Client });

  // 오늘의 프로그램 선택
  let program;
  const isCustomMode = POST_MODE === 'custom';

  if (isCustomMode) {
    console.log(`🛠️ 수동 커스텀 모드 실행: 키워드='${CUSTOM_KEYWORD}', 주제='${CUSTOM_TOPIC}'`);
    if (!CUSTOM_TOPIC) {
      console.error('❌ 커스텀 모드에서는 CUSTOM_TOPIC이 필수입니다.');
      process.exit(1);
    }
    program = {
      title: CUSTOM_TOPIC,
      category: CUSTOM_KEYWORD || '기타',
      targetAudience: '일반 대상',
      coreSummary: `${CUSTOM_KEYWORD ? CUSTOM_KEYWORD + ' 관련 ' : ''}${CUSTOM_TOPIC}`,
      sourceUrl: '', // 커스텀 모드이므로 URL 없음
      officialSiteName: '검색 기반 정보'
    };
  } else {
    console.log('🤖 자동 스케줄 모드 실행');
    program = await getInformationKeyword();
  }

  // 중복 체크 (최근 게시물 제목 기반)
  console.log('🔍 중복 게시물 여부 확인 중...');
  const recentPostsRes = await blogger.posts.list({
    blogId: BLOGGER_BLOG_ID,
    maxResults: 20,
    fetchBodies: false,
  });

  const recentPosts = recentPostsRes.data.items || [];
  const isDuplicate = recentPosts.some(post => post.title && post.title.includes(program.title));

  if (isDuplicate) {
    console.log(`⚠️ 이미 포스팅된 프로그램입니다 ('${program.title}'). 이번 스케줄은 스킵합니다. 💤`);
    return;
  }

  try {
    // 출처 페이지 크롤링 (보조 수단)
    const sourceContent = await fetchSourceContent(program.sourceUrl);
    console.log(`📄 출처 fetch ${sourceContent ? '성공' : '실패'} → ${program.sourceUrl}`);

    // 콘텐츠 생성 (Google Search Grounding)
    const newContent = await generateContent(program, sourceContent);

    // generateContent가 null을 반환한 경우 (API 재시도 초과 등)
    if (!newContent) {
      console.log('📌 콘텐츠 생성 불가로 인해 이번 스케줄을 스킵합니다. 💤');
      return;
    }

    // 블로그 발행 (품질 검증 포함)
    await publishToBlogger(newContent, program, blogger, BLOGGER_BLOG_ID, PUBLISH_NOW);

    console.log('🚀 파이프라인 실행 완료!');
  } catch (err) {
    console.error('🚨 파이프라인 실행 중 오류 발생:', err);
    process.exit(1);
  }
}

main();
