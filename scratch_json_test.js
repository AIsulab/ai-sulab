import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testJson() {
  const keyword = "유혜리";
  const newsTitle = "";
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
    5. <html>, <head>, <body> 태그는 절대 포함하지 마세요. 순수 본문(<h1>, <p> 등)만 작성하세요.
    6. 초상권 침해나 불법적인 요소가 없도록, 본문의 내용을 대표할 수 있는 안전하고 비유적인 영문 이미지 생성 프롬프트(imagePrompt)를 하나 작성해주세요. (실존 인물 이름이나 사진 요구 불가, 예: "A cinematic stage with spotlight", "Abstract representation of news")

    출력 형식:
    반드시 아래 JSON 형식으로만 출력하세요. 마크다운 백틱은 사용하지 마세요.
    {
      "imagePrompt": "영문 이미지 프롬프트",
      "htmlContent": "<h1>...생성된 HTML 본문...</h1>"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    console.log("Raw Response text:", response.text);
    const data = JSON.parse(response.text);
    console.log("Image Prompt:", data.imagePrompt);
    console.log("HTML Length:", data.htmlContent.length);
  } catch (error) {
    console.error(error);
  }
}

testJson();
