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

// 정부 공식 사이트에서 실제 본문 텍스트 추출
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

// Gemini로 SEO 최적화된 블로그 포스트 생성
async function generateContent(program, sourceContent) {
  console.log(`✍️ '${program.title}' 콘텐츠 생성 중...`);

  const prompt = `당신은 정부 정책과 복지 혜택을 전문적으로 정리하는 콘텐츠 에디터입니다.
독자에게 실질적으로 도움이 되는 깊이 있는 글을 작성합니다.

엄격한 사실 기반 작성 규칙:
- 아래 제공되는 '참고 자료'에 명시된 내용만을 근거로 작성할 것
- 참고 자료에 없는 구체적 숫자, 금액, 기한, 자격 조건은 절대 추측하거나 지어내지 말 것
- 참고 자료가 불충분한 부분은 "공식 사이트에서 최신 정보 확인 필요"로 안내할 것
- 부정확한 정보를 쓰느니 일반적 설명만 하는 것이 낫다

프로그램 정보:
- 제목: ${program.title}
- 카테고리: ${program.category}
- 대상: ${program.targetAudience}
- 공식 출처: ${program.sourceUrl}

참고 자료 (공식 사이트에서 가져온 실제 내용):
${sourceContent || '참고 자료를 가져오지 못함 - 일반적인 안내만 작성할 것'}

작성 요구사항:
1. 제목: <h1>로 SEO 최적화된 매력적 제목 (40-60자, 연도/숫자 포함 권장)
2. 도입부: <p>로 2-3문장. 독자가 어떤 정보를 얻을 수 있는지 명확히 제시
3. 목차: <h2>목차</h2> 다음에 <ul>로 본문 섹션 링크
4. 본문 구조:
   - <h2>지원 대상</h2> - 자격 요건을 <ul>로 명확히
   - <h2>지원 내용 및 혜택</h2> - 구체적 금액/혜택을 <ul> 또는 <table>로
   - <h2>신청 방법</h2> - 단계별 절차를 <ol>로
   - <h2>준비 서류</h2> - <ul>로
   - <h2>주의사항 및 자주 묻는 질문</h2> - Q&A 형식
   - <h2>마무리</h2> - 핵심 요약과 행동 유도
5. 분량: 본문 텍스트 기준 2500자 이상 (한글)
6. 강조: 중요 수치, 기한, 조건은 <strong> 또는 <mark>로
7. 출처 표시: 본문 마지막에 <p>📌 자세한 내용 및 최신 정보: <a href="${program.sourceUrl}" target="_blank">${program.title} 공식 페이지</a></p>
8. 금지: <html>, <head>, <body> 태그 / 추측성 정보 / 부정확한 숫자

이미지 프롬프트 (imagePrompt) 규칙:
- 본문 주제를 시각적으로 직접 표현하는 구체적이고 실사적인 영문 프롬프트
- 실존 인물 묘사 금지, 브랜드 로고 금지
- "abstract", "metaphorical", "symbolic", "generic" 같은 표현 절대 사용 금지
- 한국적 맥락이 자연스러울 때는 "Korean" 키워드 포함
- 반드시 마지막에 스타일 키워드 포함: "photorealistic, editorial photography, professional composition, cinematic lighting, high detail, 8k"

출력 형식 (반드시 JSON으로만 출력, 마크다운 백틱 사용 금지):
{
  "title": "h1 안에 들어갈 텍스트만 추출한 제목",
  "imagePrompt": "영문 이미지 프롬프트",
  "htmlContent": "<h1>...</h1>...전체 HTML 본문..."
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const data = JSON.parse(response.text);
    const cleanedHtml = data.htmlContent.replace(/<\/?(html|head|body)[^>]*>/gi, '').trim();

    const encodedPrompt = encodeURIComponent(data.imagePrompt);
    const thumbnailHtml = `<div style="text-align: center; margin-bottom: 20px;"><img src="https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&model=flux&nologo=true&enhance=true" alt="${program.title} 관련 이미지" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" /></div>`;

    const styledHtml = `<div style="font-size: 18px; line-height: 1.8; color: #222; font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif; word-break: keep-all; letter-spacing: -0.5px;">
  ${thumbnailHtml}
  ${cleanedHtml}
</div>`;

    return {
      title: data.title,
      htmlBody: styledHtml,
    };
  } catch (error) {
    console.error('콘텐츠 생성 실패:', error);
    throw error;
  }
}

// Blogger에 포스트 발행
async function publishToBlogger(newContent, program, blogger, blogId) {
  console.log(`💾 Blogger(블로그 ID: ${blogId})에 포스팅 중...`);

  const labels = [program.title, program.category, '정부지원금', '정책정보', '혜택안내'];

  try {
    const res = await blogger.posts.insert({
      blogId: blogId,
      isDraft: false,
      requestBody: {
        title: newContent.title,
        content: newContent.htmlBody,
        labels: labels,
      },
    });
    console.log(`✅ 구글 블로그 발행 성공! 글 확인: ${res.data.url}`);
  } catch (error) {
    console.error('❌ 구글 블로그 발행 실패:', error.message);
    throw error;
  }
}

// 메인 실행 함수
async function main() {
  const { GEMINI_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, BLOGGER_BLOG_ID } = process.env;

  if (!GEMINI_API_KEY || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !BLOGGER_BLOG_ID) {
    console.error('❌ API 키 또는 Blogger 인증 정보(.env)가 누락되었습니다. 실행을 중단합니다.');
    process.exit(1);
  }

  // Blogger API 초기화
  const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  const blogger = google.blogger({ version: 'v3', auth: oauth2Client });

  // 오늘의 프로그램 선택
  const program = await getInformationKeyword();

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
    // 출처 페이지 크롤링
    const sourceContent = await fetchSourceContent(program.sourceUrl);
    console.log(`📄 출처 fetch ${sourceContent ? '성공' : '실패'} → ${program.sourceUrl}`);

    // 콘텐츠 생성
    const newContent = await generateContent(program, sourceContent);

    // 블로그 발행
    await publishToBlogger(newContent, program, blogger, BLOGGER_BLOG_ID);

    console.log('🚀 파이프라인 실행 완료!');
  } catch (err) {
    console.error('🚨 파이프라인 실행 중 오류 발생:', err);
    process.exit(1);
  }
}

main();
