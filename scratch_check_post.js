import { google } from 'googleapis';
import * as dotenv from 'dotenv';
dotenv.config();

async function checkPost() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, BLOGGER_BLOG_ID } = process.env;
  
  const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

  const blogger = google.blogger({ version: 'v3', auth: oauth2Client });

  try {
    const res = await blogger.posts.get({
      blogId: BLOGGER_BLOG_ID,
      postId: '480658446859401736' // Extracted from the URL content earlier
    });
    console.log("TITLE:", res.data.title);
    console.log("CONTENT LENGTH:", res.data.content ? res.data.content.length : 0);
    console.log("CONTENT SNIPPET:", res.data.content ? res.data.content.substring(0, 200) : "EMPTY");
  } catch (error) {
    console.error('❌ 실패:', error.message);
  }
}

checkPost();
