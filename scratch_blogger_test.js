import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config();

async function testPublish() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, BLOGGER_BLOG_ID } = process.env;
  
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
      isDraft: false,
      requestBody: {
        title: "API 테스트 포스트",
        content: "<h1>이것은 제목입니다</h1><p>이것은 <strong>강조된</strong> 내용입니다.</p>",
        labels: ["테스트"]
      }
    });
    
    console.log(`✅ 글 확인: ${res.data.url}`);
  } catch (error) {
    console.error('❌ 실패:', error.message);
  }
}

testPublish();
