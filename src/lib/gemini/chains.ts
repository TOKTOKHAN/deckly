import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {
  generateCoverTemplate,
  generateTableOfContentsTemplate,
  generateConclusionTemplate,
  generateHTMLWrapper,
  TemplateData,
} from './templates';
import { BODY_PROMPT_TEMPLATE, KEYWORD_EXTRACTION_PROMPT } from './prompts';

// Gemini 모델 초기화
const getModel = () => {
  const model = process.env.GEMINI_MODEL || 'gemini-3-pro-preview';
  return new ChatGoogleGenerativeAI({
    model,
    temperature: 0.7,
    apiKey: process.env.GEMINI_API_KEY,
  });
};

// 프롬프트에 변수 주입
function formatPrompt(template: string, variables: Record<string, string>): string {
  let prompt = template;
  Object.entries(variables).forEach(([key, value]) => {
    prompt = prompt.replace(new RegExp(`\\{${key}\\}`, 'g'), value || '');
  });
  return prompt;
}

// 전사록에서 키워드 및 설명 문구 추출
export async function extractKeywordsFromTranscript(
  transcriptText?: string,
  meetingNotes?: string,
): Promise<{
  keywords: Array<{ icon?: string; title: string }>;
  description?: string;
}> {
  // 전사록이나 미팅 노트가 없으면 기본값 반환
  const text = transcriptText || meetingNotes;
  if (!text || text.trim().length === 0) {
    return {
      keywords: [
        { icon: '🎨', title: 'UX Renewal' },
        { icon: '💻', title: 'Tech Stack' },
        { icon: '📈', title: 'Growth' },
      ],
    };
  }

  try {
    const model = getModel();
    const prompt = formatPrompt(KEYWORD_EXTRACTION_PROMPT, {
      transcriptText: text,
    });

    const response = await model.invoke(prompt);
    const content =
      typeof response.content === 'string' ? response.content : JSON.stringify(response.content);

    // JSON 파싱 시도
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      const parsed = JSON.parse(jsonStr);
      if (parsed.keywords && Array.isArray(parsed.keywords) && parsed.keywords.length > 0) {
        return {
          keywords: parsed.keywords.slice(0, 3), // 최대 3개만 반환
          description: parsed.description || undefined,
        };
      }
    }

    // JSON 파싱 실패 시 기본값 반환
    console.warn('키워드 추출 실패, 기본값 사용');
    return {
      keywords: [
        { icon: '🎨', title: 'UX Renewal' },
        { icon: '💻', title: 'Tech Stack' },
        { icon: '📈', title: 'Growth' },
      ],
    };
  } catch (error) {
    console.error('키워드 추출 오류:', error);
    // 오류 발생 시 기본값 반환
    return {
      keywords: [
        { icon: '🎨', title: 'UX Renewal' },
        { icon: '💻', title: 'Tech Stack' },
        { icon: '📈', title: 'Growth' },
      ],
    };
  }
}

// 제안서 생성 체인 (표지 + 본문 + 끝마무리)
export async function generateProposalWithChains(
  data: TemplateData & { meetingNotes?: string },
): Promise<string> {
  try {
    // 0. 키워드 및 설명 문구 추출 (전사록 기반)
    const extractedData = await extractKeywordsFromTranscript(
      data.transcriptText,
      data.meetingNotes,
    );
    console.log('키워드 추출 완료:', extractedData.keywords);
    console.log('설명 문구 추출 완료:', extractedData.description);

    // 1. 표지 생성 (템플릿 + AI 키워드 + 설명 문구)
    const cover = await generateCoverTemplate(
      data,
      extractedData.keywords,
      extractedData.description,
    );
    console.log('표지 생성 완료, 길이:', cover.length);
    console.log('표지 미리보기:', cover.substring(0, 200));

    // 2. 목차 생성 (템플릿)
    const tableOfContents = generateTableOfContentsTemplate(data.brandColor1);
    console.log('목차 생성 완료, 길이:', tableOfContents.length);

    // 3. 본문 생성 (AI)
    const model = getModel();
    const bodyPrompt = formatPrompt(BODY_PROMPT_TEMPLATE, {
      meetingNotes: data.meetingNotes || '',
      projectName: data.projectName,
      clientCompanyName: data.clientCompanyName,
      slogan: data.slogan || '',
      teamSize: data.teamSize || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      reviewPeriod: data.reviewPeriod || '',
      maintenancePeriod: data.maintenancePeriod || '',
      openDate: data.openDate || '',
      budget: data.budgetMin || '',
      projectOverview: data.projectOverview || '',
      priorityFeatures: data.priorityFeatures || '',
      brandColor1: data.brandColor1 || '#4f46e5',
      brandColor2: data.brandColor2 || '#1f2937',
    });

    const bodyResponse = await model.invoke(bodyPrompt);
    const bodyContent =
      typeof bodyResponse.content === 'string'
        ? bodyResponse.content
        : JSON.stringify(bodyResponse.content);
    console.log('본문 생성 완료, 길이:', bodyContent.length);
    console.log('본문 미리보기:', bodyContent.substring(0, 300));

    // AI가 생성한 본문에서 표지나 끝마무리가 포함되어 있는지 확인
    if (bodyContent.includes('TOKTOKHAN.DEV') && bodyContent.includes('감사합니다')) {
      console.warn('⚠️ 본문에 표지/끝마무리가 포함되어 있을 수 있습니다.');
    }

    // 4. 끝마무리 생성 (템플릿)
    const conclusion = generateConclusionTemplate(data);
    console.log('끝마무리 생성 완료, 길이:', conclusion.length);
    console.log('끝마무리 미리보기:', conclusion.substring(0, 200));

    // 5. 조합 (표지 + 목차 + 본문 + 끝마무리)
    const combinedContent = cover + tableOfContents + bodyContent + conclusion;
    console.log('전체 조합 완료, 총 길이:', combinedContent.length);
    console.log('조합된 내용의 첫 500자:', combinedContent.substring(0, 500));
    console.log(
      '조합된 내용의 마지막 500자:',
      combinedContent.substring(combinedContent.length - 500),
    );

    // 표지와 끝마무리가 포함되어 있는지 확인
    const hasCover = combinedContent.includes('bg-gradient-to-br from-indigo-600 to-gray-800');
    const hasConclusion = combinedContent.includes('감사합니다');
    console.log('표지 포함 여부:', hasCover);
    console.log('끝마무리 포함 여부:', hasConclusion);

    const finalHTML = generateHTMLWrapper(
      combinedContent,
      data.font,
      data.brandColor1,
      data.brandColor2,
    );
    console.log('최종 HTML 생성 완료, 총 길이:', finalHTML.length);

    return finalHTML;
  } catch (error) {
    console.error('LangChain 제안서 생성 오류:', error);
    throw error;
  }
}
