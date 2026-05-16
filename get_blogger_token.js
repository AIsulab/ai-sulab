import { google } from 'googleapis';
import express from 'express';
import open from 'open';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// ---------------------------------------------------------
// 구글 클라우드 콘솔에서 발급받은 OAuth 클라이언트 정보를 .env에 넣어야 합니다.
// GOOGLE_CLIENT_ID=...
// GOOGLE_CLIENT_SECRET=...
// ---------------------------------------------------------

const PORT = 3000;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = `http://localhost:${PORT}/oauth2callback`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ 오류: .env 파일에 GOOGLE_CLIENT_ID와 GOOGLE_CLIENT_SECRET이 없습니다.");
  console.log("구글 클라우드 콘솔에서 OAuth 클라이언트 ID를 생성하고 .env에 추가해주세요.");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const app = express();

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log('\n=============================================');
      console.log('✅ 인증 성공! 아래 값을 .env 파일에 복사해서 붙여넣으세요:');
      console.log('=============================================\n');
      console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
      console.log('=============================================');
      console.log('⚠️ 주의: 이 터미널 창은 이제 닫아도 됩니다.');
      
      // .env 자동 업데이트 시도
      try {
        const envPath = path.resolve('.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        if (envContent.includes('GOOGLE_REFRESH_TOKEN=')) {
          envContent = envContent.replace(/GOOGLE_REFRESH_TOKEN=.*/, `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
        } else {
          envContent += `\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`;
        }
        fs.writeFileSync(envPath, envContent, 'utf8');
        console.log('✅ .env 파일에 GOOGLE_REFRESH_TOKEN이 자동 저장되었습니다.');
      } catch (e) {
        console.log('⚠️ .env 자동 저장 실패. 수동으로 복사해서 넣어주세요.');
      }

      res.send('<h1>인증이 완료되었습니다! 터미널 창을 확인해주세요.</h1><p>이 창은 닫으셔도 됩니다.</p>');
      
      // 서버 종료
      setTimeout(() => process.exit(0), 1000);
    } catch (error) {
      console.error('토큰 발급 중 오류:', error);
      res.send('<h1>인증 오류 발생</h1><p>터미널을 확인하세요.</p>');
    }
  } else {
    res.send('<h1>인증 코드가 없습니다.</h1>');
  }
});

app.listen(PORT, async () => {
  console.log(`로컬 서버가 포트 ${PORT}에서 시작되었습니다.`);
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // refresh_token을 받기 위해 필수
    prompt: 'consent', // 사용자에게 권한 동의를 명시적으로 요청
    scope: ['https://www.googleapis.com/auth/blogger']
  });

  console.log('브라우저를 열어 구글 인증을 진행합니다...');
  await open(authUrl);
});
