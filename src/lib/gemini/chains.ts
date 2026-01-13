import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import {
  generateCoverTemplate,
  generateTableOfContentsTemplate,
  generateConclusionTemplate,
  generateHTMLWrapper,
  generateBodySection1Template,
  generateBodySection2Template,
  generateBodySection3Template,
  generateBodySection4Template,
  generateBodySection5Template,
  generateStrengthsTemplate,
  TemplateData,
  BodySection1Data,
  BodySection2Data,
  BodySection3Data,
  BodySection4Data,
  BodySection5Data,
} from './templates';
import { getContrastTextColorWithGray } from './templates/constants';
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
  keywords: Array<{ icon?: string; title: string; sub?: string }>;
  description?: string;
}> {
  // 전사록이나 미팅 노트가 없으면 기본값 반환
  const text = transcriptText || meetingNotes;
  if (!text || text.trim().length === 0) {
    return {
      keywords: [
        { icon: '🎨', title: 'UX Renewal', sub: '개인화 경험 강화' },
        { icon: '💻', title: 'Tech Stack', sub: '클라우드 네이티브' },
        { icon: '📈', title: 'Growth', sub: '데이터 중심 성장' },
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
        { icon: '🎨', title: 'UX Renewal', sub: '개인화 경험 강화' },
        { icon: '💻', title: 'Tech Stack', sub: '클라우드 네이티브' },
        { icon: '📈', title: 'Growth', sub: '데이터 중심 성장' },
      ],
    };
  } catch (error) {
    console.error('키워드 추출 오류:', error);
    // 오류 발생 시 기본값 반환
    return {
      keywords: [
        { icon: '🎨', title: 'UX Renewal', sub: '개인화 경험 강화' },
        { icon: '💻', title: 'Tech Stack', sub: '클라우드 네이티브' },
        { icon: '📈', title: 'Growth', sub: '데이터 중심 성장' },
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
    const tableOfContents = generateTableOfContentsTemplate(
      data.brandColor1,
      data.brandColor2,
      data.brandColor3,
    );
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
    const bodyContentRaw =
      typeof bodyResponse.content === 'string'
        ? bodyResponse.content
        : JSON.stringify(bodyResponse.content);
    console.log('본문 JSON 생성 완료, 길이:', bodyContentRaw.length);
    console.log('본문 JSON 미리보기:', bodyContentRaw.substring(0, 500));

    // JSON 파싱
    let bodyData: {
      section1?: BodySection1Data;
      section2?: BodySection2Data;
      section3?: BodySection3Data;
      section4?: BodySection4Data;
      section5?: BodySection5Data;
    } = {};

    try {
      // JSON 추출 (마크다운 코드 블록 제거)
      const jsonMatch =
        bodyContentRaw.match(/```json\s*([\s\S]*?)\s*```/) || bodyContentRaw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        bodyData = JSON.parse(jsonStr);
        console.log('본문 JSON 파싱 성공');
      } else {
        console.warn('⚠️ JSON 형식을 찾을 수 없습니다. 원본 내용을 사용합니다.');
        // JSON 파싱 실패 시 빈 데이터 사용
      }
    } catch (error) {
      console.error('본문 JSON 파싱 오류:', error);
      console.warn('⚠️ JSON 파싱 실패, 빈 데이터로 진행합니다.');
    }

    // budgetMin 데이터를 section4.budget에 매핑 (AI가 생성하지 않은 경우)
    if (data.budgetMin && data.budgetMin.trim() !== '') {
      if (!bodyData.section4) {
        bodyData.section4 = {};
      }
      if (!bodyData.section4.budget) {
        bodyData.section4.budget = {
          amount: data.budgetMin,
          description: '',
        };
      } else if (!bodyData.section4.budget.amount) {
        bodyData.section4.budget.amount = data.budgetMin;
      }
    }

    // 브랜드 컬러 설정
    const primaryColor = data.brandColor1 || '#4f46e5';
    const secondaryColor = data.brandColor2 || '#1f2937';
    const tertiaryColor = data.brandColor3 || '#0a0c10';

    // 각 섹션 템플릿 생성 (3가지 브랜드 컬러 전달)
    const section1HTML = generateBodySection1Template(
      bodyData.section1 || {},
      primaryColor,
      secondaryColor,
      tertiaryColor,
    );
    const section2HTML = generateBodySection2Template(
      bodyData.section2 || {},
      primaryColor,
      secondaryColor,
      tertiaryColor,
    );
    const section3HTML = generateBodySection3Template(
      bodyData.section3 || {},
      primaryColor,
      secondaryColor,
      tertiaryColor,
    );
    const section4HTML = generateBodySection4Template(
      bodyData.section4 || {},
      primaryColor,
      secondaryColor,
      tertiaryColor,
      data.startDate,
      data.endDate,
      data.reviewPeriod,
    );
    const section5HTML = generateBodySection5Template(
      bodyData.section5 || {},
      primaryColor,
      secondaryColor,
      tertiaryColor,
    );

    // 본문 조합 (Gemini가 생성한 데이터 기반)
    const bodyContent = section1HTML + section2HTML + section3HTML + section4HTML + section5HTML;
    console.log('본문 HTML 생성 완료, 총 길이:', bodyContent.length);

    // 3.5. 고정 템플릿: Strengths 템플릿 생성 (conclusion 전에 위치)
    // 주의: 이 템플릿은 Gemini 생성 데이터와 무관하게 항상 포함되는 고정 템플릿입니다.
    const textColors = getContrastTextColorWithGray(tertiaryColor);
    const strengthsHTML = generateStrengthsTemplate(
      primaryColor,
      secondaryColor,
      tertiaryColor,
      textColors,
    );
    console.log('Strengths 템플릿 생성 완료, 길이:', strengthsHTML.length);

    // 4. 끝마무리 생성 (템플릿)
    const conclusion = generateConclusionTemplate(data);
    console.log('끝마무리 생성 완료, 길이:', conclusion.length);
    console.log('끝마무리 미리보기:', conclusion.substring(0, 200));

    // 5. 조합 (표지 + 목차 + 본문 + 고정 템플릿(strengths) + 끝마무리)
    // 주의: section1HTML 내부에 company-introduction-template이 고정 템플릿으로 포함되어 있습니다.
    const combinedContent = cover + tableOfContents + bodyContent + strengthsHTML + conclusion;
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
      data.brandColor3,
    );
    console.log('최종 HTML 생성 완료, 총 길이:', finalHTML.length);

    return finalHTML;
  } catch (error) {
    console.error('LangChain 제안서 생성 오류:', error);
    throw error;
  }
}
