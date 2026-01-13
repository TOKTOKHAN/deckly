import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createProposalPrompt } from '@/lib/gemini/prompts';
import { generateProposalWithChains } from '@/lib/gemini/chains';
import { ProposalRequest } from '@/types/gemini';

// 동적 렌더링 강제 (POST 요청 및 request.json() 사용)
export const dynamic = 'force-dynamic';

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

    // 필수 필드 검증
    // meetingNotes가 있으면 우선 사용, 없으면 title과 client 필수
    if (!body.meetingNotes && (!body.title || !body.client)) {
      return NextResponse.json(
        { success: false, error: '회의록/메모 또는 제목과 고객사는 필수 입력 항목입니다.' },
        { status: 400 },
      );
    }

    // LangChain 사용 여부 (환경 변수로 제어 가능, 기본값: true)
    const useLangChain = process.env.USE_LANGCHAIN !== 'false';

    let content: string;

    if (useLangChain) {
      // LangChain 사용: 표지/끝마무리 템플릿 + 본문 AI 생성
      content = await generateProposalWithChains({
        projectName: body.title || '',
        clientCompanyName: body.client || '',
        clientContact: body.clientContact,
        meetingDate: body.date,
        ourContact: body.ourContact,
        proposalDate: body.proposalDate,
        meetingNotes: body.meetingNotes,
        // Step 1 추가 필드들
        slogan: body.slogan,
        brandColor1: body.brandColor1,
        brandColor2: body.brandColor2,
        brandColor3: body.brandColor3,
        clientLogo: body.clientLogo,
        clientWebsite: body.clientWebsite,
        font: body.font,
        teamSize: body.teamSize,
        startDate: body.startDate,
        endDate: body.endDate,
        reviewPeriod: body.reviewPeriod,
        maintenancePeriod: body.maintenancePeriod,
        openDate: body.openDate,
        projectOverview: body.projectOverview,
        priorityFeatures: body.requirements,
        budgetMin: body.budget,
      });
    } else {
      // 기존 방식: 전체 제안서를 AI로 생성
      const prompt = createProposalPrompt(body);

      const ai = new GoogleGenAI({});
      const modelName = process.env.GEMINI_MODEL || 'gemini-3-pro-preview';

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });

      content = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (!content) {
        console.error('No content in response:', response);
        throw new Error('제안서 생성에 실패했습니다. 응답이 비어있습니다.');
      }
    }

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
