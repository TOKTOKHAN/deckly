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

    // 2. 목차 생성 (템플릿)
    const tableOfContents = generateTableOfContentsTemplate();

    // 3. 본문 생성 (AI)
    const model = getModel();
    const bodyPrompt = formatPrompt(BODY_PROMPT_TEMPLATE, {
      meetingNotes: data.meetingNotes || '',
      projectName: data.projectName,
      clientCompanyName: data.clientCompanyName,
      clientContact: data.clientContact || '',
      meetingDate: data.meetingDate || '',
      ourContact: data.ourContact || '',
      proposalDate: data.proposalDate || '',
    });

    const bodyResponse = await model.invoke(bodyPrompt);
    const bodyContent =
      typeof bodyResponse.content === 'string'
        ? bodyResponse.content
        : JSON.stringify(bodyResponse.content);

    // 4. 끝마무리 생성 (템플릿)
    const conclusion = generateConclusionTemplate(data);

    // 5. 조합 (표지 + 목차 + 본문 + 끝마무리)
    const combinedContent = cover + tableOfContents + bodyContent + conclusion;
    const finalHTML = generateHTMLWrapper(combinedContent);

    return finalHTML;
  } catch (error) {
    console.error('LangChain 제안서 생성 오류:', error);
    throw error;
  }
}
