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
    <div class="a4-page bg-gradient-to-br from-indigo-600 to-gray-800 text-white flex flex-col items-center justify-center min-h-screen">
      <div class="text-center space-y-8">
        <h1 class="text-5xl font-black mb-4">${data.projectName}</h1>
        <div class="border-t-2 border-white/30 w-32 mx-auto my-8"></div>
        <div class="space-y-4">
          <p class="text-2xl font-bold">TOKTOKHAN.DEV</p>
          ${data.clientCompanyName ? `<p class="text-lg opacity-90">${data.clientCompanyName}</p>` : ''}
        </div>
        <div class="mt-12 space-y-2 text-sm opacity-80">
          ${data.proposalDate ? `<p>제안서 작성일: ${data.proposalDate}</p>` : ''}
          ${data.meetingDate ? `<p>미팅 일자: ${data.meetingDate}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

// 목차 HTML 템플릿
export function generateTableOfContentsTemplate(): string {
  return `
    <div class="a4-page bg-white p-8">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-indigo-600 mb-8 text-center">목차</h2>
        <div class="space-y-4 mt-12">
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-lg text-gray-900">1. 프로젝트 개요</span>
            <span class="text-gray-500">3</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-lg text-gray-900">2. 요구사항 이해</span>
            <span class="text-gray-500">5</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-lg text-gray-900">3. 제안하는 방향성</span>
            <span class="text-gray-500">7</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-lg text-gray-900">4. 예상 일정 및 추진 방식</span>
            <span class="text-gray-500">9</span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-200">
            <span class="text-lg text-gray-900">5. 기대효과</span>
            <span class="text-gray-500">11</span>
          </div>
        </div>
        <div class="mt-16 text-sm text-gray-500 text-center">
          <p>* 페이지 번호는 실제 제안서와 다를 수 있습니다.</p>
        </div>
      </div>
    </div>
  `;
}

// 끝마무리 HTML 템플릿
export function generateConclusionTemplate(data: TemplateData): string {
  return `
    <div class="a4-page bg-white p-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-8 py-16">
          <h2 class="text-3xl font-bold text-indigo-600 mb-8">감사합니다</h2>
          <div class="space-y-4">
            <p class="text-lg text-gray-900">
              본 제안서에 대한 추가 문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
            </p>
            <div class="mt-12 pt-8 border-t-2 border-indigo-600/20">
              <p class="text-2xl font-bold text-indigo-600 mb-4">TOKTOKHAN.DEV</p>
              ${data.ourContact ? `<p class="text-gray-900">담당자: ${data.ourContact}</p>` : ''}
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
