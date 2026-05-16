import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// 임시 DB 파일에서 첫 번째 유저의 토큰을 가져오는 함수
async function getUserToken() {
  try {
    const data = await fs.promises.readFile('./users_db.json', 'utf-8');
    const db = JSON.parse(data);
    if (db.users && db.users.length > 0) {
      // MVP: 첫 번째 유저(본인)의 토큰을 사용
      return db.users[0].tokens;
    }
  } catch (error) {
    console.error('users_db.json 파일을 읽을 수 없습니다. 먼저 /auth/google 로 로그인 해주세요.');
  }
  return null;
}

async function uploadToYouTube() {
  console.log('🚀 YouTube API 자동 업로드 스크립트 가동');

  const tokens = await getUserToken();
  if (!tokens) {
    console.error('❌ 저장된 OAuth 토큰이 없습니다. 백엔드 연동을 먼저 진행해주세요.');
    return;
  }

  // OAuth 클라이언트 설정 및 토큰 세팅
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    // Redirect URI (업로드 스크립트에서는 안 쓰지만 객체 생성용으로 임의 지정)
    'http://localhost:3000/auth/google/callback'
  );
  
  oauth2Client.setCredentials(tokens);

  const youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client
  });

  const videoPath = path.join(process.cwd(), 'shorts_final.mp4');
  
  if (!fs.existsSync(videoPath)) {
    console.error(`❌ 비디오 파일을 찾을 수 없습니다: ${videoPath}`);
    return;
  }

  console.log('📤 YouTube 서버로 쇼츠 업로드 전송 중... (잠시 대기)');

  try {
    const res = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title: '다들 갓생 산다는데? 당신만 모르는 진짜 현실 💣 #Shorts', // 자동으로 #Shorts 태그 포함
          description: 'AI가 작성하고 렌더링한 SULAB 영상 자동화 데모입니다.\n\n#Shorts #동기부여 #팩폭 #AI자동화 #SULAB',
          tags: ['Shorts', 'AI', '동기부여', '자동화'],
          categoryId: '22', // People & Blogs 카테고리 ID
        },
        status: {
          privacyStatus: 'private', // 기본값 비공개. 확신이 생기면 'public'으로 변경하세요!
          selfDeclaredMadeForKids: false
        }
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    }, {
      // 100MB 이상 업로드를 위해 옵션 추가 가능. (쇼츠는 용량이 작으므로 기본값 무방)
      onUploadProgress: evt => {
        const progress = (evt.bytesRead / fs.statSync(videoPath).size) * 100;
        process.stdout.write(`\r⏳ 진행률: ${Math.round(progress)}%`);
      },
    });

    console.log(`\n\n✅ 업로드 대성공!`);
    console.log(`📺 YouTube Video ID: ${res.data.id}`);
    console.log(`🔗 영상 확인 주소: https://www.youtube.com/shorts/${res.data.id}`);

  } catch (error) {
    console.error('\n❌ 업로드 실패:', error.message);
    if (error.response && error.response.data && error.response.data.error) {
      console.error('상세 에러 내용:', JSON.stringify(error.response.data.error, null, 2));
    }
  }
}

uploadToYouTube();
