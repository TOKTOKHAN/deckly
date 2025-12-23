// 제안서 표지 및 끝마무리 템플릿
// Tailwind CSS 기반 고정 템플릿

export interface TemplateData {
  projectName: string;
  clientCompanyName: string;
  clientContact?: string;
  meetingDate?: string;
  ourContact?: string;
  proposalDate?: string;
}

// Tailwind 테마 기반 Gem (디자인 시스템)
export const TAILWIND_THEME = {
  colors: {
    primary: 'indigo-600',
    secondary: 'gray-800',
    accent: 'indigo-500',
    background: 'white',
    text: 'gray-900',
  },
  spacing: {
    section: 'p-8',
    card: 'p-6',
    title: 'mb-6',
  },
  typography: {
    font: 'font-sans',
    title: 'text-3xl font-bold',
    subtitle: 'text-xl font-semibold',
    body: 'text-base',
  },
};

// 표지 HTML 템플릿
export function generateCoverTemplate(data: TemplateData): string {
  return `
    <div class="a4-page bg-gradient-to-br from-indigo-600 to-gray-800 text-white flex flex-col min-h-screen" style="background: linear-gradient(to bottom right,rgb(97, 94, 168),rgb(41, 74, 120)) !important; color: white !important; position: relative !important;">
      <!-- 상단 헤더 -->
      <div class="px-12 pt-12 flex justify-between items-start z-10" style="padding-left: 3rem !important; padding-right: 3rem !important; padding-top: 3rem !important;">
        <div class="text-xs font-bold tracking-widest text-white opacity-60 uppercase" style="font-size: 0.625rem !important; letter-spacing: 0.3em !important; opacity: 0.6 !important;">
          ${data.proposalDate ? `Proposal Date: ${data.proposalDate}` : ''}
        </div>
        <div class="text-xs font-bold tracking-widest text-white opacity-60 uppercase" style="font-size: 0.625rem !important; letter-spacing: 0.3em !important; opacity: 0.6 !important;">
          ${data.meetingDate ? data.meetingDate : ''}
        </div>
      </div>

      <!-- 중앙 메인 영역 -->
      <div class="flex-1 px-12 flex flex-col justify-center z-10 relative" style="padding-left: 3rem !important; padding-right: 3rem !important;">
        <!-- 클라이언트 회사명 영역 -->
        ${
          data.clientCompanyName
            ? `
        <div class="mb-16" style="margin-bottom: 4rem !important;">
          <h2 class="text-4xl font-black text-white tracking-tight" style="display: inline-block !important; font-size: 2.25rem !important; font-weight: 900 !important; color: white !important; letter-spacing: -0.025em !important; max-width: fit-content !important;">${data.clientCompanyName}</h2>
          
        </div>
        `
            : ''
        }

        <!-- 메인 타이틀 -->
        <div class="relative">
          <h1 class="text-7xl font-black text-white leading-tight mb-8 tracking-tight" style="color: white !important; font-size: 4.5rem !important; font-weight: 900 !important; line-height: 1.1 !important; letter-spacing: -0.025em !important; margin-bottom: 2rem !important;">${data.projectName}</h1>
          <div class="pl-6 border-l-2 border-white" style="padding-left: 0.5rem !important; border-left: 2px solid rgb(244, 238, 238) !important;">
            <p class="text-lg font-light leading-relaxed max-w-xl" style="color: rgba(255, 255, 255, 0.8) !important; font-size: 1.125rem !important; font-weight: 300 !important; line-height: 1.75 !important; max-width: 36rem !important;">
              ${data.clientCompanyName ? `${data.clientCompanyName}를 위한` : ''} 구체적인 프로젝트 기획 제안서
            </p>
          </div>
        </div>
      </div>

      <!-- 하단 푸터 -->
      <div class="px-12 pb-12 z-10" style="padding-left: 3rem !important; padding-right: 3rem !important; padding-bottom: 3rem !important;">
        <div class="border-t border-white pt-8 flex justify-between items-end" style="border-top: 1px solid rgba(255, 255, 255, 0.2) !important; padding-top: 2rem !important;">
          <!-- 회사 정보 -->
          <div>
            <div class="flex flex-col gap-2 items-start mb-5" style="margin-bottom: 1.25rem !important;">
              <span class="text-xl font-bold text-white tracking-tight" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important; letter-spacing: -0.025em !important;">TOKTOKHAN.DEV</span>
              <span class="text-[11px] opacity-60">서울특별시 마포구 동교로 12안길 39</span>
              <span class="text-[11px] opacity-60">E. sales@toktokhan.dev | W. www.toktokhan.dev</span>
              <span class="text-[11px] opacity-60">© 2025 Toktokhan.dev. All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 목차 HTML 템플릿
export function generateTableOfContentsTemplate(): string {
  return `
    <div class="a4-page bg-white p-4" style="padding: 1rem !important;">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-6xl font-bold text-indigo-600 mb-8 text-center">목  차</h2>
        <div class="space-y-4 mt-12">
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-3xl font-semibold text-indigo-600">1. 프로젝트 개요</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-3xl font-semibold text-indigo-600">2. 요구사항 이해</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-3xl font-semibold text-indigo-600">3. 제안하는 방향성</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-3xl font-semibold text-indigo-600">4. 예상 일정 및 추진 방식</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-3xl font-semibold text-indigo-600">5. 기대효과</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 끝마무리 HTML 템플릿
export function generateConclusionTemplate(data: TemplateData): string {
  return `
    <div class="a4-page bg-white p-8" style="background-color: white !important; padding: 2rem !important;">
      <div class="max-w-4xl mx-auto" style="max-width: 56rem !important; margin-left: auto !important; margin-right: auto !important;">
        <div class="text-center space-y-8 py-16" style="text-align: center !important; padding-top: 4rem !important; padding-bottom: 4rem !important;">
          <div class="space-y-4" style="display: flex; flex-direction: column; gap: 1rem;">
            <p class="text-xl font-semibold text-gray-700" style="font-size: 1.5rem !important; font-weight: semibold !important; color: #374151 !important; line-height: 1.75rem;">
              ${data.projectName}의 성공적인 추진을 위해 최선을 다하겠습니다.
              <br style="display: block; content: ''; margin-top: 0.5rem;">
              본 제안서에 대한 추가 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
              <br style="display: block; content: ''; margin-top: 0.5rem;">
              함께 성장하는 파트너가 되기를 기대합니다.
            </p>
            <h2 class="text-2xl font-bold text-indigo-600 mb-8" style="font-size: 2.25rem !important; font-weight: bold !important; color: #4f46e5 !important; margin-bottom: 2rem !important;">감사합니다</h2>
            <div class="mt-12 pt-8 border-t-2 border-indigo-600/20" style="margin-top: 3rem !important; padding-top: 2rem !important; border-top: 2px solid rgba(79, 70, 229, 0.2) !important;">
              <p class="text-4xl font-bold text-indigo-600 mb-4" style="font-size: 2.25rem !important; font-weight: bold !important; color: #4f46e5 !important; margin-bottom: 1rem !important;">TOKTOKHAN.DEV</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// HTML 래퍼 (공통 헤더/스타일)
export function generateHTMLWrapper(bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>제안서</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <style>
    * {
      font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    }
    :root {
      --primary: #4f46e5;
      --secondary: #1f2937;
    }
    @media print {
      @page { 
        margin: 0; 
        size: A4; 
      }
      body { 
        margin: 0; 
        padding: 0; 
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important; 
      }
      .a4-page {
        width: 210mm;
        min-height: 297mm;
        max-height: 297mm;
        page-break-after: always;
        page-break-inside: avoid;
        margin: 0;
        padding: 20mm;
        box-sizing: border-box;
        border: none;
        box-shadow: none;
        overflow: visible;
        display: flex;
        flex-direction: column;
      }
      /* 표지 페이지는 패딩 제거하고 중앙 정렬 */
      .a4-page:first-child {
        padding: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
      }
      .a4-page:first-child > div {
        width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
      }
      .section-content {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      /* 섹션이 길 경우 자동으로 다음 페이지로 넘어가도록 */
      .proposal-section {
        page-break-inside: avoid;
        break-inside: avoid-page;
      }
      /* 마지막 페이지는 page-break-after 제거 */
      .a4-page:last-child {
        page-break-after: auto;
      }
    }
  </style>
</head>
<body class="bg-white">
  ${bodyContent}
</body>
</html>`;
}
