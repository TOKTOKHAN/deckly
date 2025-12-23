import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.');
}

const genAI = new GoogleGenAI({
  apiKey: apiKey,
});

// 제안서 생성용 모델
// 환경 변수 GEMINI_MODEL로 모델명 설정 가능 (기본값: gemini-3-pro-preview)
const getModelName = () => process.env.GEMINI_MODEL || 'gemini-3-pro-preview';

export const generateProposal = async (prompt: string) => {
  const response = await genAI.models.generateContent({
    model: getModelName(),
    contents: prompt,
  });
  return response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || '';
};

// 스트리밍 모델 실시간 생성되는 내용들 표시
export const generateProposalStream = async (prompt: string) => {
  const response = await genAI.models.generateContentStream({
    model: getModelName(),
    contents: prompt,
  });
  return response;
};

export default genAI;
