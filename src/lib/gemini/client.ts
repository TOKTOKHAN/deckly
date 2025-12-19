import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

// Gemini 클라이언트 초기화
const genAI = new GoogleGenerativeAI(apiKey);

// 모델 불러오기 (gemini-pro 모델)
export const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// 제안서 생성용 모델
export const streamingModel = genAI.getGenerativeModel({
  model: 'gemini-pro',
});

export default genAI;
