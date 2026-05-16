import { GoogleGenAI } from '@google/genai';
import * as googleTTS from 'google-tts-api';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
ffmpeg.setFfmpegPath('C:\\Users\\DESKSUB\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe');
import 'dotenv/config';

// 1. AI 숏폼 대본 생성기
async function generateScript() {
  console.log('🤖 [1/4] Gemini로 숏폼 대본 생성 중...');
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `
    당신은 천재적인 유튜브 쇼츠/인스타 릴스 기획자입니다.
    오늘의 핫이슈 하나를 임의로 선정하여 15초 분량의 매운맛 숏폼 대본을 작성해주세요.
    
    [조건]
    1. 나레이션 텍스트만 출력할 것 (지문, 효과음 등 제외)
    2. 시청자의 스크롤을 멈추게 하는 강력한 첫 문장(Hook)으로 시작
    3. 총 글자 수를 100자 이내로 무조건 아주 짧게 끝낼 것
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  
  const script = response.text.trim();
  console.log(`\n📝 [완성된 대본]\n${script}\n`);
  return script;
}

// 2. TTS (음성) 생성기
async function generateAudio(text) {
  console.log('🗣️ [2/4] 대본을 사람 목소리(TTS)로 변환 중...');
  try {
    const url = googleTTS.getAudioUrl(text, {
      lang: 'ko',
      slow: false,
      host: 'https://translate.google.com',
    });
    
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'arraybuffer'
    });
    
    const audioPath = path.join(process.cwd(), 'shorts_audio.mp3');
    await fs.writeFile(audioPath, response.data);
    console.log(`🎵 [오디오 생성 완료] ${audioPath}`);
    return audioPath;
  } catch (error) {
    console.error('오디오 생성 실패:', error.message);
  }
}

// 3. AI 배경 이미지 생성기
async function generateImage(script) {
  console.log('🎨 [3/4] 대본에 맞는 9:16 배경 이미지 생성 중...');
  
  const prompt = encodeURIComponent(`cinematic 9:16 vertical background for youtube shorts, dark atmospheric, viral trending topic, highly detailed, 8k, unreal engine 5`);
  const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=1080&height=1920&nologo=true`;
  
  try {
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'arraybuffer'
    });
    
    const imagePath = path.join(process.cwd(), 'shorts_bg.jpg');
    await fs.writeFile(imagePath, response.data);
    console.log(`🖼️ [이미지 생성 완료] ${imagePath}`);
    return imagePath;
  } catch (error) {
    console.error('이미지 생성 실패:', error.message);
  }
}

// 4. 비디오 합성기 (FFmpeg)
async function renderVideo(imagePath, audioPath) {
  console.log('🎬 [4/4] FFmpeg 엔진 가동: 오디오와 배경을 결합하여 MP4 생성 중...');
  const outputPath = path.join(process.cwd(), 'shorts_final.mp4');
  
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input(imagePath)
      .loop() // 이미지를 무한 반복
      .input(audioPath)
      .outputOptions([
        '-c:v libx264',     // 비디오 코덱
        '-tune stillimage', // 이미지 기반 영상에 최적화
        '-c:a aac',         // 오디오 코덱
        '-b:a 192k',
        '-pix_fmt yuv420p',
        '-shortest'         // 오디오 길이에 맞춰 영상 종료
      ])
      .save(outputPath)
      .on('end', () => {
        console.log(`✅ [비디오 렌더링 성공] ${outputPath}`);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error('❌ 비디오 렌더링 실패:', err.message);
        reject(err);
      });
  });
}

// 🚀 메인 실행 함수
async function runVideoAutomation() {
  console.log('🎬 SULAB 원클릭 릴스/쇼츠 엔진 가동 시작\n========================================');
  
  const script = await generateScript();
  
  const [audioPath, imagePath] = await Promise.all([
    generateAudio(script),
    generateImage(script)
  ]);
  
  await renderVideo(imagePath, audioPath);
  
  console.log('========================================');
  console.log('✨ [모든 과정 완료] 완성된 쇼츠 영상이 준비되었습니다!');
}

runVideoAutomation();
