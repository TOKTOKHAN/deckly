import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {
  generateCoverTemplate,
  generateTableOfContentsTemplate,
  generateConclusionTemplate,
  generateHTMLWrapper,
  TemplateData,
} from './templates';
import { BODY_PROMPT_TEMPLATE } from './prompts';

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

// 제안서 생성 체인 (표지 + 본문 + 끝마무리)
export async function generateProposalWithChains(
  data: TemplateData & { meetingNotes?: string },
): Promise<string> {
  try {
    // 1. 표지 생성 (템플릿)
    const cover = generateCoverTemplate(data);
    console.log('표지 생성 완료, 길이:', cover.length);
    console.log('표지 미리보기:', cover.substring(0, 200));

    // 2. 목차 생성 (템플릿)
    const tableOfContents = generateTableOfContentsTemplate();
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
