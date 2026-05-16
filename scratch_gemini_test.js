import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: '안녕하세요. 짧은 인사말 1문장 작성해주세요.',
    });
    console.log("Response Text:", response.text);
    console.log("Raw Response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error(error);
  }
}

test();
