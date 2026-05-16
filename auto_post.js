import fs from 'fs/promises';
import path from 'path';
import Parser from 'rss-parser';
import { GoogleGenAI } from '@google/genai';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';

dotenv.config();

// ---------------------------------------------------------
// ⚠️ 사용 전 주의사항 (User TODO)
// 1. .env 파일에 아래의 키들을 넣으세요:
//    GEMINI_API_KEY=
//    GOOGLE_CLIENT_ID=
//    GOOGLE_CLIENT_SECRET=
//    GOOGLE_REFRESH_TOKEN=
//    BLOGGER_BLOG_ID=
// ---------------------------------------------------------

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const parser = new Parser({
  customFields: {
    item: ['ht:news_item']
  }
});

// 1. 구글 트렌드에서 핫한 키워드와 관련 뉴스 제목 가져오기
async function getTrendingKeyword() {
  console.log('🔍 트렌드 검색 중...');
  try {
    const feed = await parser.parseURL('https://trends.google.co.kr/trending/rss?geo=KR');
    if (feed.items && feed.items.length > 0) {
      const item = feed.items[0];
      const keyword = item.title;
      let newsTitle = '';
      
      // 트렌드와 관련된 뉴스 제목 추출 (AI에게 문맥을 주기 위함)
      if (item['ht:news_item'] && item['ht:news_item']['ht:news_item_title']) {
        newsTitle = item['ht:news_item']['ht:news_item_title'][0] || '';
      }
      
      return { keyword, newsTitle };
    }
  } catch (error) {
    console.error('트렌드 가져오기 실패:', error);
  }
  return { keyword: 'AI 자동화', newsTitle: 'AI 자동화 시대의 도래' }; // 실패 시 기본값
}

// 2. Gemini API로 블로그 포스트(SEO 최적화된 HTML) 생성하기
async function generateContent({ keyword, newsTitle }) {
  console.log(`✍️ '${keyword}' (이슈: ${newsTitle}) 키워드로 블로그 포스트 작성 중...`);
  
  const prompt = `
    당신은 구글 검색 상위 노출(SEO)과 트래픽 유입에 능통한 '정보성 블로그 전문 에디터'입니다.
    오늘의 핫 트렌드 키워드: "${keyword}"
    화제가 된 뉴스/이슈: "${newsTitle}"
    
    이 키워드/이슈에 대해 사람들이 검색엔진에서 가장 궁금해할 정보(예: 지원금 신청 방법, 대상, 혜택, 핵심 요약, 사건의 전말 등)를 아주 읽기 쉽고 친절하게 정리하는 블로그 포스트 HTML을 작성해 주세요. 네이버 블로그의 인기 정보성 글처럼 가독성이 뛰어나고 체류 시간을 늘릴 수 있는 구조여야 합니다.
    
    조건:
    1. <h1> 태그로 클릭을 유도하는 매력적인 제목 (예: "2026년 OO지원금 신청 방법 및 대상 총정리!", "OOO 열애설 총정리: 핵심 요약")
    2. 아래와 같은 구조(<h2>)를 포함해 주세요:
       - <h2>핵심 요약 (혹은 사건 개요)</h2>
       - <h2>상세 정보 (지원 자격, 혜택, 또는 사건의 전개)</h2>
       - <h2>신청 방법 및 주의사항 (해당할 경우) / 향후 전망</h2>
       - <h2>마무리 (개인적 의견이나 독자 질문 유도)</h2>
    3. 본문 내 중요 단어, 꿀팁, 강조할 숫자는 <strong> 태그나 <mark> 태그로 강조
    4. 문단은 너무 길지 않게 2~3문장 단위로 끊어서 작성하고 <ul>이나 <ol> 리스트를 적극 활용
    5. <html>, <head>, <body> 태그는 절대 포함하지 마세요. <body> 태그 내부의 순수 본문(<h1>, <p> 등)만 출력해야 합니다.
    6. 마크다운 백틱은 절대 포함하지 말고 순수 HTML 텍스트만 출력하세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let cleanedHtml = response.text.replace(/```html/g, '').replace(/```/g, '');
    cleanedHtml = cleanedHtml.replace(/<\/?body>/gi, '').trim(); // body 태그 제거
    
    // 블로그 포스트 상단에 시각적 요소를 위해 랜덤 이미지 추가 (가독성 향상)
    const thumbnailHtml = `<div style="text-align: center; margin-bottom: 20px;"><img src="https://picsum.photos/seed/${encodeURIComponent(keyword)}/800/400" alt="${keyword} 관련 이미지" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" /></div>`;
    
    return {
      title: `${keyword} 이슈 총정리`, // 내부 저장용
      htmlBody: thumbnailHtml + '\n' + cleanedHtml
    };
  } catch (error) {
    console.error('콘텐츠 생성 실패:', error);
    throw error;
  }
}

// 3. 구글 블로그(Blogger)로 포스트 발행하기
async function publishToBlogger(newContent, keyword) {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, BLOGGER_BLOG_ID } = process.env;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !BLOGGER_BLOG_ID) {
    throw new Error('❌ Blogger API 인증 정보(.env)가 누락되었습니다. 클라이언트 ID, 시크릿, 리프레시 토큰, 블로그 ID를 모두 확인하세요.');
  }

  console.log(`💾 Blogger(블로그 ID: ${BLOGGER_BLOG_ID})에 포스팅 중...`);

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN
  });

  const blogger = google.blogger({
    version: 'v3',
    auth: oauth2Client
  });

  try {
    const res = await blogger.posts.insert({
      blogId: BLOGGER_BLOG_ID,
      isDraft: false, // true로 하면 임시저장(비공개) 상태로 올라갑니다.
      requestBody: {
        title: newContent.title,
        content: newContent.htmlBody,
        labels: [keyword, "트렌드", "이슈정리"]
      }
    });
    
    console.log(`✅ 구글 블로그 발행 성공! 글 확인: ${res.data.url}`);
  } catch (error) {
    console.error('❌ 구글 블로그 발행 실패:', error.message);
    throw error;
  }
}

// 메인 실행 함수
async function main() {
  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY가 설정되지 않았습니다. 실행을 중단합니다.');
    return;
  }

  try {
    const trendData = await getTrendingKeyword();
    const newContent = await generateContent(trendData);
    await publishToBlogger(newContent, trendData.keyword);
    
    console.log('🚀 Blogger 파이프라인 실행 완료!');
  } catch (err) {
    console.error('🚨 파이프라인 실행 중 오류 발생:', err);
    process.exit(1);
  }
}

main();
