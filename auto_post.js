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

// 1. 구글 트렌드에서 핫한 키워드와 관련 뉴스 제목 가져오기 (오전/이슈용)
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

// 1.5. 유용한 정보성 키워드 가져오기 (오후용)
function getInformationKeyword() {
  const topics = [
    "청년 정부지원금 혜택",
    "소상공인 대출 및 지원 혜택",
    "직장인 연말정산 및 세금 절약 꿀팁",
    "무주택자 주거 및 부동산 지원 정책",
    "신혼부부 및 육아/출산 지원금",
    "대중교통비 할인 혜택 (K-패스 등)",
    "병원비/건강보험 환급 혜택",
    "저소득층 및 취약계층 복지 혜택",
    "내게 맞는 숨은 정부지원금 찾기 방법"
  ];
  // 날짜(일차)를 기준으로 돌아가면서 선택 (매일 다른 주제)
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const selectedIndex = dayOfYear % topics.length;
  const keyword = topics[selectedIndex];
  
  return { keyword, newsTitle: "유용한 실생활 정보 및 혜택 정리" };
}

// 2. Gemini API로 블로그 포스트(SEO 최적화된 HTML) 생성하기
async function generateContent({ keyword, newsTitle }, isInfoMode) {
  console.log(`✍️ '${keyword}' 키워드로 블로그 포스트 작성 중... (모드: ${isInfoMode ? '정보성' : '이슈성'})`);
  
  let prompt = '';
  
  if (isInfoMode) {
    prompt = `
      당신은 구글 검색 상위 노출(SEO)과 트래픽 유입에 능통한 '정보성 블로그 전문 에디터'입니다.
      오늘 독자들에게 전달할 꿀팁/정보 카테고리: "${keyword}"
      
      위 카테고리에 해당하는 실제적이고 구체적인 대한민국의 혜택, 지원금, 혹은 유용한 생활 정보 한 가지를 임의로 선정하여, 일반인들이 몰라서 놓치기 쉬운 부분을 아주 읽기 쉽고 친절하게 정리하는 블로그 포스트 HTML을 작성해 주세요. 네이버 블로그의 인기 정보성 글처럼 가독성이 뛰어나고 체류 시간을 늘릴 수 있는 구조여야 합니다.
      
      조건:
      1. <h1> 태그로 클릭을 유도하는 매력적인 제목 (예: "2026년 몰라서 못 받는 OOO 혜택, 신청 방법 총정리!")
      2. <h2> 태그로 소제목 구분 (지원 대상, 혜택 내용, 신청 방법 및 주의사항, 꿀팁 등)
      3. 본문 내 중요 단어는 <strong>, <mark> 태그로 강조
      4. <html>, <head>, <body> 태그는 절대 포함하지 마세요. 순수 본문(<h1>, <p> 등)만 작성하세요.
      5. 초상권 침해나 저작권 이슈가 없도록, 본문의 내용을 상징적으로 나타낼 수 있는 안전하고 비유적인 '영문 이미지 생성 프롬프트(imagePrompt)'를 하나 작성해주세요. (예: "A bright glowing piggy bank", "An abstract representation of health insurance")

      출력 형식 (반드시 아래 JSON 형식으로만 출력하세요):
      {
        "imagePrompt": "영문 이미지 프롬프트",
        "htmlContent": "<h1>...생성된 HTML 본문...</h1>"
      }
    `;
  } else {
    prompt = `
      당신은 구글 검색 상위 노출(SEO)과 트래픽 유입에 능통한 '정보성 블로그 전문 에디터'입니다.
      오늘의 핫 트렌드 키워드: "${keyword}"
      화제가 된 뉴스/이슈: "${newsTitle}"
      
      이 키워드/이슈에 대해 사람들이 검색엔진에서 가장 궁금해할 정보(예: 지원금 신청 방법, 대상, 혜택, 핵심 요약, 사건의 전말 등)를 아주 읽기 쉽고 친절하게 정리하는 블로그 포스트 HTML을 작성해 주세요. 네이버 블로그의 인기 정보성 글처럼 가독성이 뛰어나고 체류 시간을 늘릴 수 있는 구조여야 합니다.
      
      조건:
      1. <h1> 태그로 클릭을 유도하는 매력적인 제목
      2. <h2> 태그로 소제목 구분 (핵심 요약, 상세 정보, 마무리 등)
      3. 본문 내 중요 단어는 <strong>, <mark> 태그로 강조
      4. <html>, <head>, <body> 태그는 절대 포함하지 마세요. 순수 본문(<h1>, <p> 등)만 작성하세요.
      5. 초상권 침해나 저작권 이슈가 없도록, 본문의 내용을 상징적으로 나타낼 수 있는 안전하고 비유적인 '영문 이미지 생성 프롬프트(imagePrompt)'를 하나 작성해주세요. (예: 특정 인물 이름 대신 "A cinematic professional news studio background", "An abstract representation of internet trends", "A beautiful generic cityscape")

      출력 형식 (반드시 아래 JSON 형식으로만 출력하세요):
      {
        "imagePrompt": "영문 이미지 프롬프트",
        "htmlContent": "<h1>...생성된 HTML 본문...</h1>"
      }
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const data = JSON.parse(response.text);
    let cleanedHtml = data.htmlContent.replace(/<\/?body>/gi, '').trim(); // body 태그 혹시라도 있으면 제거
    
    // Pollinations.ai 무료 이미지 생성 API 사용 (초상권 침해 없는 안전한 프롬프트 기반)
    const encodedPrompt = encodeURIComponent(data.imagePrompt);
    const thumbnailHtml = `<div style="text-align: center; margin-bottom: 20px;"><img src="https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=400&nologo=true" alt="${keyword} 관련 이미지" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" /></div>`;
    
    // 시력이 안 좋은 사람도 쉽게 읽을 수 있도록 가독성 전용 래퍼(wrapper) 추가
    const styledHtml = `
      <div style="font-size: 18px; line-height: 1.8; color: #222; font-family: 'Noto Sans KR', 'Malgun Gothic', sans-serif; word-break: keep-all; letter-spacing: -0.5px;">
        ${thumbnailHtml}
        ${cleanedHtml}
      </div>
    `;

    return {
      title: isInfoMode ? `${keyword} 완벽 정리` : `${keyword} 이슈 총정리`, // 내부 저장용
      htmlBody: styledHtml
    };
  } catch (error) {
    console.error('콘텐츠 생성 실패:', error);
    throw error;
  }
}

// 3. 구글 블로그(Blogger)로 포스트 발행하기
async function publishToBlogger(newContent, keyword, blogger, blogId, isInfoMode) {
  console.log(`💾 Blogger(블로그 ID: ${blogId})에 포스팅 중...`);

  const labels = isInfoMode ? [keyword, "정부지원금", "생활꿀팁", "정보"] : [keyword, "트렌드", "이슈정리"];

  try {
    const res = await blogger.posts.insert({
      blogId: blogId,
      isDraft: false, // true로 하면 임시저장(비공개) 상태로 올라갑니다.
      requestBody: {
        title: newContent.title,
        content: newContent.htmlBody,
        labels: labels
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
  const { GEMINI_API_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, BLOGGER_BLOG_ID } = process.env;

  if (!GEMINI_API_KEY || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !BLOGGER_BLOG_ID) {
    console.error('❌ API 키 또는 Blogger 인증 정보(.env)가 누락되었습니다. 실행을 중단합니다.');
    return;
  }

  // Blogger API 초기화
  const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  const blogger = google.blogger({ version: 'v3', auth: oauth2Client });

  // 한국 시간(KST) 기준 시간대 계산
  const kstHour = (new Date().getUTCHours() + 9) % 24;
  const isMorning = kstHour >= 5 && kstHour < 14; // 오전 5시 ~ 오후 2시 사이는 오전(이슈) 모드

  let topicData;
  let isInfoMode = false;

  if (isMorning) {
    console.log('🌅 [오전 스케줄] 실시간 트렌드 이슈 포스팅 모드입니다.');
    topicData = await getTrendingKeyword();
  } else {
    console.log('🌇 [오후 스케줄] 유용한 정보/정부지원금 포스팅 모드입니다.');
    topicData = getInformationKeyword();
    isInfoMode = true;
  }

  try {
    const expectedTitle = isInfoMode ? `${topicData.keyword} 완벽 정리` : `${topicData.keyword} 이슈 총정리`;

    // 중복 방지 (최근 게시물 검색)
    console.log('🔍 중복 게시물 여부 확인 중...');
    const recentPostsRes = await blogger.posts.list({
      blogId: BLOGGER_BLOG_ID,
      maxResults: 10,
      fetchBodies: false // 본문은 가져오지 않아 속도 최적화
    });
    
    const recentPosts = recentPostsRes.data.items || [];
    const isDuplicate = recentPosts.some(post => post.title === expectedTitle);
    
    if (isDuplicate) {
      console.log(`⚠️ 이미 포스팅된 주제입니다 ('${expectedTitle}'). 이번 스케줄은 스킵합니다. 💤`);
      return; // 중복일 경우 프로그램 정상 종료
    }

    // 본문 생성 및 포스팅
    const newContent = await generateContent(topicData, isInfoMode);
    await publishToBlogger(newContent, topicData.keyword, blogger, BLOGGER_BLOG_ID, isInfoMode);
    
    console.log('🚀 Blogger 파이프라인 실행 완료!');
  } catch (err) {
    console.error('🚨 파이프라인 실행 중 오류 발생:', err);
    process.exit(1);
  }
}

main();
