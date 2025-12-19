import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.');
}

const genAI = new GoogleGenAI({
  apiKey: apiKey,
});

// 제안서 생성용 모델 (구글 콘솔 클라우드 무료 티어에서는 flash 모델만 사용 가능)
export const generateProposal = async (prompt: string) => {
  const response = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || '';
};

// 스트리밍 모델 실시간 생성되는 내용들 표시
export const generateProposalStream = async (prompt: string) => {
  const response = await genAI.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return response;
};

export default genAI;
