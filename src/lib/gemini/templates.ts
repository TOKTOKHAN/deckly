// 제안서 표지 및 끝마무리 템플릿
// Tailwind CSS 기반 고정 템플릿

export interface TemplateData {
  // 기본 정보
  projectName: string;
  clientCompanyName: string;
  clientContact?: string; // 클라이언트 담당자명
  meetingDate?: string; // 미팅 일자
  ourContact?: string; // 제안사 담당자명
  slogan?: string; // 제안서 마무리 부분에 사용
  brandColor1?: string; // 브랜드 컬러 1
  brandColor2?: string; // 브랜드 컬러 2
  brandColor3?: string; // 브랜드 컬러 3
  clientLogo?: string; // 고객사 로고 URL (선택)
  clientWebsite?: string; // 고객사 사이트 URL (선택)
  font?: string; // 폰트 (기본값: 'Pretendard')

  // 프로젝트 정보
  teamSize?: string; // 투입 인력
  startDate?: string; // 프로젝트 시작일
  endDate?: string; // 개발 종료일
  reviewPeriod?: string; // 검수 기간
  maintenancePeriod?: string; // 유지보수 기간
  openDate?: string; // 오픈일/런칭일 (선택)

  // 예산
  budgetMin?: string;

  // 기타
  includeSummary?: string;
  projectOverview?: string; // 프로젝트 개요 (includeSummary와 동일한 용도)
  priorityFeatures?: string;
  requirements?: string; // 우선순위 기능 (priorityFeatures와 동일한 용도)
  transcriptText?: string; // 미팅 전사록
  meetingNotes?: string; // 미팅 전사록 (transcriptText와 동일한 용도)
  proposalDate?: string; // 제안서 작성일 (선택, 없으면 현재 날짜 사용)
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
  // 브랜드 컬러 추출
  const primaryColor = data.brandColor1 || '#4f46e5'; // indigo-600
  const secondaryColor = data.brandColor2 || '#1f2937'; // gray-800

  // 배경 그라데이션 생성
  const backgroundGradient = `linear-gradient(to bottom right, ${primaryColor}, ${secondaryColor})`;

  // 날짜 포맷팅 함수 (proposalDate가 있으면 사용, 없으면 현재 날짜 사용)
  const formatDate = (dateString?: string): string => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let date: Date;
    if (dateString) {
      // proposalDate가 있으면 사용
      date = new Date(dateString);
    } else {
      // 없으면 현재 날짜 사용
      date = new Date();
    }

    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formattedDate = formatDate(data.proposalDate);

  return `
    <div class="a4-page bg-gradient-to-br from-indigo-600 to-gray-800 text-white flex flex-col min-h-screen" style="background: ${backgroundGradient} !important; color: white !important; position: relative !important;">
      <!-- 상단 헤더 -->
      <div class="px-12 pt-12 flex justify-end items-start z-10" style="padding-left: 3rem !important; padding-right: 3rem !important; padding-top: 3rem !important;">
        <div class="text-[10px] font-bold tracking-[0.3em] text-white/60 uppercase" style="font-size: 10px !important; font-weight: bold !important; letter-spacing: 0.3em !important; color: rgba(255, 255, 255, 0.6) !important; text-transform: uppercase !important;">
          ${formattedDate}
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
              <span class="text-xl font-bold text-white tracking-tight w-full text-center" style="...">TOKTOKHAN.DEV</span>
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
export function generateTableOfContentsTemplate(
  brandColor1?: string,
  brandColor2?: string,
): string {
  const primaryColor = brandColor1 || '#4f46e5'; // 기본값: indigo-600
  const secondaryColor = brandColor2 || '#1f2937'; // 기본값: gray-800

  return `
    <div class="a4-page bg-white p-8" style="padding: 2rem !important;">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-6xl font-bold mb-12 text-center" style="color: ${secondaryColor} !important;">목  차</h2>
        
        <!-- 카드 그리드 레이아웃 -->
        <div class="grid grid-cols-2 gap-6 mt-8">
          <!-- I. 제안 개요 카드 -->
          <div class="bg-white rounded-xl overflow-hidden" style="border: 1px solid #e5e7eb !important;">
            <div class="h-2" style="background: linear-gradient(to right, ${primaryColor}, ${secondaryColor});"></div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4" style="color: ${primaryColor} !important;">I. 제안 개요</h3>
              <p class="text-sm text-gray-500 mb-4 font-medium">Introduction</p>
              <div class="space-y-2">
                <div class="text-base font-medium text-gray-700">1.1 제안 배경 및 목적</div>
                <div class="text-base font-medium text-gray-700">1.2 제안의 범위</div>
                <div class="text-base font-medium text-gray-700">1.3 제안의 특징 및 장점</div>
                <div class="text-base font-medium text-gray-700">1.4 기대 효과</div>
              </div>
            </div>
          </div>

          <!-- II. 제안 전략 카드 -->
          <div class="bg-white rounded-xl overflow-hidden" style="border: 1px solid #e5e7eb !important;">
            <div class="h-2" style="background: linear-gradient(to right, ${primaryColor}, ${secondaryColor});"></div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4" style="color: ${primaryColor} !important;">II. 제안 전략</h3>
              <p class="text-sm text-gray-500 mb-4 font-medium">Strategy</p>
              <div class="space-y-2">
                <div class="text-base font-medium text-gray-700">2.1 사업 이해 및 분석</div>
                <div class="text-base font-medium text-gray-700">2.2 목표 모델 설계</div>
                <div class="text-base font-medium text-gray-700">2.3 추진 전략</div>
              </div>
            </div>
          </div>

          <!-- III. 기술 및 기능 부문 카드 -->
          <div class="bg-white rounded-xl overflow-hidden" style="border: 1px solid #e5e7eb !important;">
            <div class="h-2" style="background: linear-gradient(to right, ${primaryColor}, ${secondaryColor});"></div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4" style="color: ${primaryColor} !important;">III. 기술 및 기능 부문</h3>
              <p class="text-sm text-gray-500 mb-4 font-medium">Technical Solution</p>
              <div class="space-y-2">
                <div class="text-base font-medium text-gray-700">3.1 시스템 목표 아키텍처</div>
                <div class="text-base font-medium text-gray-700">3.2 기능 구현 방안</div>
                <div class="text-base font-medium text-gray-700">3.3 보안 및 데이터 관리</div>
                <div class="text-base font-medium text-gray-700">3.4 시스템 연계 방안</div>
              </div>
            </div>
          </div>

          <!-- IV. 사업 관리 부문 카드 -->
          <div class="bg-white rounded-xl overflow-hidden" style="border: 1px solid #e5e7eb !important;">
            <div class="h-2" style="background: linear-gradient(to right, ${primaryColor}, ${secondaryColor});"></div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4" style="color: ${primaryColor} !important;">IV. 사업 관리 부문</h3>
              <p class="text-sm text-gray-500 mb-4 font-medium">Project Management</p>
              <div class="space-y-2">
                <div class="text-base font-medium text-gray-700">4.1 추진 일정</div>
                <div class="text-base font-medium text-gray-700">4.2 수행 조직 및 인력</div>
                <div class="text-base font-medium text-gray-700">4.3 개발 방법론</div>
                <div class="text-base font-medium text-gray-700">4.4 품질 보증 계획</div>
              </div>
            </div>
          </div>

          <!-- V. 사업 지원 부문 카드 -->
          <div class="bg-white rounded-xl overflow-hidden col-span-2" style="border: 1px solid #e5e7eb !important;">
            <div class="h-2" style="background: linear-gradient(to right, ${primaryColor}, ${secondaryColor});"></div>
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-4" style="color: ${primaryColor} !important;">V. 사업 지원 부문</h3>
              <p class="text-sm text-gray-500 mb-4 font-medium">Support & Maintenance</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <div class="text-base font-medium text-gray-700">5.1 교육 훈련 계획</div>
                  <div class="text-base font-medium text-gray-700">5.2 기술 이전 계획</div>
                </div>
                <div class="space-y-2">
                  <div class="text-base font-medium text-gray-700">5.3 유지보수 및 하자보수</div>
                  <div class="text-base font-medium text-gray-700">5.4 비상 대책</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 끝마무리 HTML 템플릿
export function generateConclusionTemplate(data: TemplateData): string {
  // 브랜드 컬러 추출
  const primaryColor = data.brandColor1 || '#4f46e5'; // 기본값: indigo-600

  // 브랜드 컬러를 rgba로 변환 (투명도 20%용)
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const primaryColorRgba = hexToRgba(primaryColor, 0.2);

  return `
    <div class="a4-page bg-white p-8" style="background-color: white !important; padding: 2rem !important;">
      <div class="max-w-5xl mx-auto" style="max-width: 64rem !important; margin-left: auto !important; margin-right: auto !important;">
        <div class="space-y-12 py-12" style="padding-top: 3rem !important; padding-bottom: 3rem !important;">
          <!-- 메인 제목 -->
          <div class="text-center">
            <h1 class="text-5xl font-bold mb-6" style="font-size: 3rem !important; font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 1.5rem !important; line-height: 1.2;">
              귀사의 성공적인 미래,<br>TOKTOKHAN.DEV이 함께하겠습니다.
            </h1>
            <div class="w-24 h-1 mx-auto mb-8" style="width: 6rem !important; height: 0.25rem !important; margin-left: auto !important; margin-right: auto !important; margin-bottom: 2rem !important; background: linear-gradient(to right, ${primaryColor}, ${data.brandColor2 || '#1f2937'}) !important;"></div>
          </div>

          <!-- 강조 문구 -->
          <div class="text-center">
            <p class="text-2xl font-semibold text-gray-800 leading-relaxed" style="font-size: 1.75rem !important; font-weight: 600 !important; color: #1f2937 !important; line-height: 1.75;">
              "안정적인 기술력과 책임감 있는 수행으로<br>무결점 시스템 구축을 약속합니다."
            </p>
          </div>

          <!-- 3가지 약속 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16" style="margin-top: 4rem !important; display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 2rem !important;">
            <!-- 01. 검증된 전문성 -->
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style="width: 4rem !important; height: 4rem !important; border-radius: 9999px !important; margin-bottom: 1rem !important; background: ${primaryColorRgba} !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;">
                <span class="text-2xl font-bold" style="font-size: 1.5rem !important; font-weight: bold !important; color: ${primaryColor} !important;">01</span>
              </div>
              <h3 class="text-xl font-bold mb-3" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 0.75rem !important;">검증된 전문성</h3>
              <p class="text-base text-gray-700 leading-relaxed" style="font-size: 1rem !important; color: #374151 !important; line-height: 1.75;">
                유사 사업 수행 실적 1위의 노하우를<br>본 사업에 쏟아붓겠습니다.
              </p>
            </div>

            <!-- 02. 핵심 인력 투입 -->
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style="width: 4rem !important; height: 4rem !important; border-radius: 9999px !important; margin-bottom: 1rem !important; background: ${primaryColorRgba} !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;">
                <span class="text-2xl font-bold" style="font-size: 1.5rem !important; font-weight: bold !important; color: ${primaryColor} !important;">02</span>
              </div>
              <h3 class="text-xl font-bold mb-3" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 0.75rem !important;">핵심 인력 투입</h3>
              <p class="text-base text-gray-700 leading-relaxed" style="font-size: 1rem !important; color: #374151 !important; line-height: 1.75;">
                본사 최고의 아키텍트와 개발팀을<br>전담 배치하여 품질을 보장합니다.
              </p>
            </div>

            <!-- 03. 상생의 파트너십 -->
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style="width: 4rem !important; height: 4rem !important; border-radius: 9999px !important; margin-bottom: 1rem !important; background: ${primaryColorRgba} !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;">
                <span class="text-2xl font-bold" style="font-size: 1.5rem !important; font-weight: bold !important; color: ${primaryColor} !important;">03</span>
              </div>
              <h3 class="text-xl font-bold mb-3" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 0.75rem !important;">상생의 파트너십</h3>
              <p class="text-base text-gray-700 leading-relaxed" style="font-size: 1rem !important; color: #374151 !important; line-height: 1.75;">
                단순 구축을 넘어 지속 가능한<br>운영 지원 체계를 약속드립니다.
              </p>
            </div>
          </div>

          <!-- 회사 정보 -->
          <div class="mt-16 pt-8 border-t-2 text-center" style="margin-top: 4rem !important; padding-top: 2rem !important; border-top: 2px solid ${primaryColorRgba} !important; text-align: center !important;">
            ${data.clientLogo ? `<div class="mb-6"><img src="${data.clientLogo}" alt="로고" class="h-16 mx-auto" style="height: 4rem !important; margin-left: auto !important; margin-right: auto !important;" /></div>` : ''}
            <p class="text-4xl font-bold mb-2" style="font-size: 2.25rem !important; font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 0.5rem !important;">TOKTOKHAN.DEV</p>
            <div class="text-sm text-gray-600 mt-4" style="font-size: 0.875rem !important; color: #4b5563 !important; margin-top: 1rem !important;">
              <p>서울특별시 마포구 동교로 12안길 39</p>
              <p class="mt-1">E. sales@toktokhan.dev | W. www.toktokhan.dev</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// HTML 래퍼 (공통 헤더/스타일)
export function generateHTMLWrapper(
  bodyContent: string,
  font?: string,
  brandColor1?: string,
  brandColo2?: string,
): string {
  // 폰트에 따른 CDN 링크 설정
  const getFontLink = (fontName?: string): string => {
    switch (fontName) {
      case 'Noto Sans KR':
        return '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">';
      case 'Inter':
        return '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">';
      case 'Pretendard':
      default:
        return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />';
    }
  };

  const fontFamily = font || 'Pretendard';
  const fontLink = getFontLink(font);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>제안서</title>
  <script src="https://cdn.tailwindcss.com"></script>
  ${fontLink}
  <style>
    * {
      font-family: '${fontFamily}', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    }
    :root {
      --primary: ${brandColor1};
      --secondar${brandColo2};
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
        orphans: 3;
        widows: 3;
      }
      .a4-page {
        width: 210mm;
        min-height: 297mm;
        height: auto;
        page-break-after: always;
        page-break-inside: auto;
        margin: 0;
        padding: 10mm;
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
      /* 목차 카드의 shadow만 제거 (border는 유지) */
      .a4-page .rounded-xl,
      .a4-page [class*="rounded-xl"] {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        filter: none !important;
      }
      /* 인라인 스타일의 shadow도 무시하도록 */
      .a4-page [style*="box-shadow"] {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
      }
      /* 제목이 페이지 끝에 혼자 남지 않도록 */
      h2, h3 {
        page-break-after: avoid;
        break-after: avoid;
        orphans: 3;
        widows: 3;
      }
      /* 제목과 다음 내용이 분리되지 않도록 */
      h2 + *, h3 + * {
        page-break-before: avoid;
        break-before: avoid;
      }
      /* 제목 바로 다음에 페이지 브레이크가 오지 않도록 */
      h2, h3 {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      /* 섹션 내용이 자연스럽게 분할되도록 */
      .section-content {
        page-break-inside: auto;
        break-inside: auto;
      }
      /* proposal-section은 내용이 길면 자동으로 다음 페이지로 넘어가도록 */
      .proposal-section {
        page-break-inside: auto;
        break-inside: auto;
        orphans: 3;
        widows: 3;
      }
      /* 본문 섹션 텍스트 크기 축소 (공간 절약) */
      .proposal-section h2 {
        font-size: 1.5rem !important; /* text-2xl */
      }
      .proposal-section h3 {
        font-size: 1.125rem !important; /* text-lg */
      }
      .proposal-section p,
      .proposal-section li,
      .proposal-section div:not([class*="text-"]) {
        font-size: 0.875rem !important; /* text-sm */
      }
      /* 리스트나 테이블이 페이지를 넘어갈 때 자연스럽게 분할 */
      ul, ol, li {
        page-break-inside: auto;
        break-inside: auto;
      }
      /* 단락이 페이지 끝에서 잘리지 않도록 */
      p {
        orphans: 3;
        widows: 3;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      /* 마지막 페이지는 page-break-after 제거 */
      .a4-page:last-child {
        page-break-after: auto;
      }
      /* 내용이 넘치면 자동으로 다음 페이지로 */
      .a4-page {
        overflow: visible !important;
      }
    }
  </style>
</head>
<body class="bg-white">
  ${bodyContent}
</body>
</html>`;
}
