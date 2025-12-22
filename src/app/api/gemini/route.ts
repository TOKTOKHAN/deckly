import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createProposalPrompt } from '@/lib/gemini/prompts';
import { ProposalRequest } from '@/types/gemini';

export async function POST(request: NextRequest) {
  try {
    // API 키 확인
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json(
        { success: false, error: 'API 키가 설정되지 않았습니다.' },
        { status: 500 },
      );
    }

    const body: ProposalRequest = await request.json();
    console.log('Request Body:', JSON.stringify(body, null, 2));

    // 필수 필드 검증
    // meetingNotes가 있으면 우선 사용, 없으면 title과 client 필수
    if (!body.meetingNotes && (!body.title || !body.client)) {
      return NextResponse.json(
        { success: false, error: '회의록/메모 또는 제목과 고객사는 필수 입력 항목입니다.' },
        { status: 400 },
      );
    }

    // 프롬프트 생성
    const prompt = createProposalPrompt(body);
    console.log('Generated Prompt:', prompt);

    // Gemini 클라이언트 생성 (최신 @google/genai 패키지 사용)
    const ai = new GoogleGenAI({});

    // 모델명: 환경 변수로 설정 가능, 기본값은 gemini-3-pro-preview
    const modelName = process.env.GEMINI_MODEL || 'gemini-3-pro-preview';

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    // 응답 구조 확인 및 처리
    console.log('Response structure:', JSON.stringify(response, null, 2));

    // 최신 SDK의 응답 구조에 맞게 처리
    const content = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!content) {
      console.error('No content in response:', response);
      throw new Error('제안서 생성에 실패했습니다. 응답이 비어있습니다.');
    }

    console.log('Generated Content Length:', content.length);
    console.log('Generated Content Preview:', content.substring(0, 200));

    return NextResponse.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error('제미나이 api 에러:', error);
    console.error('에러 내용:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '제안서 생성 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
