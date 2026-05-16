import express from 'express';
import { google } from 'googleapis';
import * as dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// OAuth 2.0 클라이언트 설정
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `http://localhost:${PORT}/auth/google/callback` // 로컬 테스트용 콜백 URL
);

// 임시 로컬 DB (실제 서비스 배포 시 Firebase/Supabase 등 실제 DB로 마이그레이션 필수)
const DB_FILE = './users_db.json';

// DB 초기화 헬퍼 함수
async function readDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { users: [] };
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// 1. 구글 로그인(Blogger 연동) 시작 URL
app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Refresh Token을 받기 위해 필수
    prompt: 'consent',      // 강제로 동의 화면을 띄워 Refresh Token 갱신
    scope: [
      'https://www.googleapis.com/auth/blogger',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  });
  res.redirect(url);
});

// 2. 구글 로그인 콜백 (동의 완료 후 리다이렉트 되는 곳)
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // 유저 이메일 정보 가져오기
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    
    // DB에 유저 정보 및 토큰 저장 (MVP 로컬 DB용)
    const db = await readDB();
    const existingUserIndex = db.users.findIndex(u => u.email === userInfo.data.email);
    
    const userData = {
      email: userInfo.data.email,
      name: userInfo.data.name,
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date
      },
      blogId: '', // 나중에 유저가 대시보드에서 선택하도록 업데이트
      isActive: true, // 구독 상태 등
      createdAt: new Date().toISOString()
    };

    if (existingUserIndex >= 0) {
      db.users[existingUserIndex] = { ...db.users[existingUserIndex], ...userData };
    } else {
      db.users.push(userData);
    }
    await writeDB(db);

    res.send(`
      <h1>🎉 SULAB 자동화 연동 성공!</h1>
      <p>환영합니다, ${userInfo.data.name}님.</p>
      <p>구글 계정과 완벽하게 연동되었습니다. 이제 창을 닫으셔도 됩니다.</p>
      <script>
        // 프론트엔드로 연동 성공 메시지 보내기 가능
      </script>
    `);
  } catch (error) {
    console.error('OAuth 인증 에러:', error);
    res.status(500).send('인증 중 오류가 발생했습니다.');
  }
});

// 3. 연동된 유저 목록 조회 (임시 대시보드 API)
app.get('/api/users', async (req, res) => {
  const db = await readDB();
  // 보안상 토큰은 제외하고 응답
  const safeUsers = db.users.map(u => ({ email: u.email, name: u.name, isActive: u.isActive }));
  res.json(safeUsers);
});

app.listen(PORT, () => {
  console.log(`🚀 SULAB SaaS 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log(`구글 연동 테스트: http://localhost:${PORT}/auth/google`);
});
