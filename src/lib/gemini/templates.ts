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
  ourLogo?: string; // 제안사 로고 URL (선택)
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
export async function generateCoverTemplate(
  data: TemplateData,
  keywordCards?: Array<{ icon?: string; title: string; sub?: string }>,
  description?: string,
): Promise<string> {
  // 브랜드 컬러 추출 (기본값: indigo-600, gray-800)
  const primaryColor = data.brandColor1 || '#4f46e5'; // 기본값: indigo-600
  const secondaryColor = data.brandColor2 || '#1f2937'; // 기본값: gray-800
  const tertiaryColor = data.brandColor3 || '#0a0c10';

  // Hex to RGBA 변환 함수
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // 브랜드 컬러 기반 색상 조합
  const cardBgColor = hexToRgba(secondaryColor, 0.4);
  const cardBorderColor = hexToRgba(primaryColor, 0.1);
  const subTextColor = hexToRgba(primaryColor, 0.8);

  // Proposal Ref 생성 함수
  const generateProposalRef = (dateString?: string): string => {
    // 클라이언트 이니셜 추출
    const getClientInitials = (text: string): string => {
      return text
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 6);
    };

    const clientInitials = data.clientCompanyName
      ? getClientInitials(data.clientCompanyName)
      : 'CLIENT';
    let date: Date;
    if (dateString) {
      date = new Date(dateString);
    } else {
      date = new Date();
    }
    const year = date.getFullYear();
    return `${year}-${clientInitials}-SI`;
  };

  // 날짜 포맷팅 (YYYY. MM. DD 형식)
  const formatIssueDate = (dateString?: string): string => {
    let date: Date;
    if (dateString) {
      date = new Date(dateString);
    } else {
      date = new Date();
    }
    const year = date.getFullYear();
    const monthNames = [
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
    ];
    const month = monthNames[date.getMonth()];
    return `${month} ${year}`;
  };

  const proposalRef = generateProposalRef(data.proposalDate);
  const issueDate = formatIssueDate(data.proposalDate);
  const clientSubtitle = data.slogan || 'Digital Transformation Partner';
  const title = data.projectName || '프로젝트 제안서';
  const subTitle =
    description ||
    `${data.clientCompanyName ? `<span style="color: ${primaryColor} !important;">${data.clientCompanyName}</span>를 위한` : ''} 프로젝트 기획 제안서`;

  // 키워드 카드 (기본값 또는 전달받은 값 사용)
  const defaultKeywords = [
    { icon: '🎨', label: 'Hyper-Personalized UX', sub: '개인화 경험 강화' },
    { icon: '💻', label: 'Scalable Architecture', sub: '클라우드 네이티브' },
    { icon: '📈', label: 'Data-Driven Growth', sub: '데이터 중심 성장' },
  ];
  const keywords =
    keywordCards && keywordCards.length > 0
      ? keywordCards.slice(0, 3).map((k, i) => ({
          icon: k.icon || defaultKeywords[i]?.icon || '✨',
          label: k.title,
          sub: k.sub || defaultKeywords[i]?.sub || '',
        }))
      : defaultKeywords;

  return `
    <div class="a4-page flex flex-col relative" style="background-color: ${tertiaryColor} !important; color: white !important; position: relative !important; overflow: hidden !important; width: 210mm !important; min-height: 297mm !important;">
      
      <!-- Decorative Background Elements -->
      <div class="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none" style="pointer-events: none !important;">
        <div class="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px]" style="background-color: ${primaryColor} !important; opacity: 0.07 !important; position: absolute !important; top: -10% !important; right: -10% !important; width: 600px !important; height: 600px !important; border-radius: 9999px !important; filter: blur(120px) !important;"></div>
        <div class="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px]" style="background-color: ${secondaryColor} !important; opacity: 0.05 !important; position: absolute !important; bottom: -5% !important; left: -5% !important; width: 400px !important; height: 400px !important; border-radius: 9999px !important; filter: blur(100px) !important;"></div>
        <div class="absolute top-[20%] left-[-10%] w-px h-[40%] bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" style="position: absolute !important; top: 20% !important; left: -10% !important; width: 1px !important; height: 40% !important; background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.2), transparent) !important;"></div>
      </div>

      <!-- Top Header -->
      <div class="cover-top-header px-16 pt-16 flex justify-between items-start z-10 relative" style="padding-left: 4rem !important; padding-right: 4rem !important; padding-top: 4rem !important; display: flex !important; flex-direction: row !important; justify-content: space-between !important; align-items: baseline !important; position: relative !important; z-index: 10 !important; width: 100% !important; box-sizing: border-box !important;">
        <div class="flex flex-col gap-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important; flex-shrink: 0 !important;">
          <span class="text-[10px] font-black tracking-[0.4em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.4em !important; color: ${primaryColor} !important; text-transform: uppercase !important; line-height: 1 !important; display: block !important; padding: 0 !important; margin: 0 !important;">
            Proposal Ref. ${proposalRef}
          </span>
          <div class="h-0.5 w-8" style="height: 2px !important; width: 2rem !important; background-color: ${primaryColor} !important; margin-top: 0.25rem !important;"></div>
        </div>
        <div class="text-[10px] font-medium tracking-[0.2em]" style="font-size: 10px !important; font-weight: 500 !important; letter-spacing: 0.2em !important; color: #71717a !important; margin-left: auto !important; flex-shrink: 0 !important; text-align: right !important; line-height: 1 !important; display: block !important; padding: 0 !important; margin: 0 !important;">
          ${issueDate}
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 px-16 flex flex-col z-10 relative" style="flex: 1 !important; padding-left: 4rem !important; padding-right: 4rem !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; align-items: flex-start !important; position: relative !important; z-index: 10 !important; padding-top: 1rem !important; padding-bottom: 1rem !important;">
        
        <!-- Logo Section -->
        <div class="mb-20" style="margin-bottom: 2rem !important;">
          <div class="flex items-center gap-4" style="display: flex !important; align-items: center !important; gap: 1rem !important; justify-content: flex-start !important;">
            ${
              data.clientLogo
                ? `
            <img 
              src="${data.clientLogo}" 
              alt="${data.clientCompanyName} 로고" 
              class="w-[60px] h-[60px]" 
              style="width: 60px !important; height: 60px !important; object-fit: contain !important; filter: drop-shadow(0 0 15px rgba(0, 100, 145, 0.4)) !important;"
            />
            `
                : `
            <!-- 기본 로고 SVG -->
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 0 15px rgba(0, 100, 145, 0.4)) !important;">
              <path d="M50 0L0 50L50 100L100 50L50 0Z" fill="${secondaryColor}"/>
              <path d="M50 0V100L100 50L50 0Z" fill="${primaryColor}"/>
              <circle cx="28" cy="42" r="6" fill="white"/>
              <circle cx="28" cy="58" r="6" fill="white"/>
              <circle cx="72" cy="50" r="6" fill="white"/>
            </svg>
            `
            }
            <div class="flex flex-col" style="display: flex !important; flex-direction: column !important;">
              <h2 class="text-4xl font-black italic tracking-tighter leading-none" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; line-height: 1 !important; font-style: italic !important; color: white !important;">
                ${data.clientCompanyName || 'Client'}<span class="font-light not-italic" style="font-weight: 300 !important; font-style: normal !important; color: ${primaryColor} !important;"> ${data.clientCompanyName ? '' : 'Company'}</span>
              </h2>
              <p class="text-[10px] tracking-[0.3em] mt-2 font-bold uppercase" style="font-size: 10px !important; letter-spacing: 0.3em !important; color: #a1a1aa !important; margin-top: 0.5rem !important; font-weight: bold !important; text-transform: uppercase !important;">
                ${clientSubtitle}
              </p>
            </div>
          </div>
        </div>

        <!-- Title Section -->
        <div class="relative mb-24" style="margin-bottom: 3rem !important; margin-top: 0 !important; position: relative !important;">
          <h1 class="text-[80px] font-black leading-[0.95] tracking-tighter mb-10" style="font-size: 80px !important; font-weight: 900 !important; line-height: 0.95 !important; letter-spacing: -0.05em !important; margin-bottom: 1.5rem !important; margin-top: 0 !important; padding-top: 0 !important; text-align: left !important;">
            <span class="block text-white drop-shadow-sm leading-tight uppercase whitespace-pre-line" style="display: block !important; color: white !important; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important; line-height: 1.1 !important; text-transform: uppercase !important; white-space: pre-line !important; text-align: left !important; margin-top: 0rem !important; padding-top: 0 !important; word-break: keep-all !important; overflow-wrap: break-word !important; hyphens: auto !important;">
              ${title}
            </span>
          </h1>

          <div class="pl-8 border-l-[3px]" style="padding-left: 2rem !important; border-left: 3px solid ${primaryColor} !important;">
            <p class="text-2xl text-zinc-300 font-light leading-snug break-keep max-w-2xl" style="font-size: 1.5rem !important; color: #d4d4d8 !important; font-weight: 300 !important; line-height: 1.375 !important; word-break: keep-all !important; max-width: 42rem !important; text-align: left !important;">
              ${subTitle}
            </p>
          </div>
        </div>

        <!-- Strategy Icons -->
        <div class="grid grid-cols-3 gap-10 max-w-2xl" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 2.5rem !important; max-width: 42rem !important; margin-left: 0 !important; margin-right: auto !important; margin-top: 1rem !important;">
          ${keywords
            .map(
              keyword => `
          <div class="border p-6 rounded-2xl backdrop-blur-sm" style="background-color: ${cardBgColor} !important; border: 1px solid ${cardBorderColor} !important; padding: 1.5rem !important; border-radius: 1rem !important; backdrop-filter: blur(4px) !important;">
            <div class="mb-4" style="margin-bottom: 1rem !important; font-size: 1.75rem !important; color: ${primaryColor} !important;">${keyword.icon || '✨'}</div>
            <p class="text-[11px] font-bold uppercase tracking-wider mb-1" style="font-size: 11px !important; color: ${subTextColor} !important; font-weight: bold !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; margin-bottom: 0.25rem !important;">
              ${keyword.label}
            </p>
            <p class="text-sm font-medium" style="font-size: 0.875rem !important; color: white !important; font-weight: 500 !important;">
              ${keyword.sub}
            </p>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Footer Area -->
      <div class="cover-footer px-16 pb-16 z-10 relative" style="padding-left: 4rem !important; padding-right: 4rem !important; padding-bottom: 2rem !important; padding-top: 1rem !important; position: relative !important; z-index: 10 !important;">
        <div class="h-px w-full mb-10" style="height: 1px !important; width: 100% !important; background: linear-gradient(to right, rgba(30, 58, 138, 0.5), rgba(39, 39, 42, 0.8), transparent) !important; margin-bottom: 1.5rem !important;"></div>
        
        <div class="flex justify-between items-end" style="display: flex !important; justify-content: space-between !important; align-items: flex-end !important;">
          <!-- Agency Info -->
          <div class="space-y-6" style="display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
            <div class="flex items-center gap-2" style="display: flex !important; align-items: center !important; gap: 0.5rem !important;">
              <img src="${data.ourLogo || '/images/tokdev-logo.jpg'}" alt="TOKTOKHAN.DEV 로고" class="w-8 h-8 rounded-lg" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; object-fit: contain !important;" />
              <span class="text-xl font-black tracking-tighter text-white" style="font-size: 1.25rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; color: white !important;">TOKTOKHAN.DEV</span>
            </div>
            
            <div class="flex gap-5" style="display: flex !important; gap: 1rem !important;">
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: ${secondaryColor} !important;">📍</span> Address
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">서울시 마포구 동교로 12안길 39</p>
              </div>
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: ${primaryColor} !important;">🌐</span> Contact
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">sales@toktokhan.dev</p>
              </div>
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: #71717a !important;">📞</span> Phone
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">010-2493-2906</p>
              </div>
            </div>
          </div>

          <!-- Security & Copyright -->
          <div class="text-right flex flex-col items-end gap-3" style="text-align: right !important; display: flex !important; flex-direction: column !important; align-items: flex-end !important; gap: 0.75rem !important;">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full border gap-2" style="display: inline-flex !important; align-items: center !important; padding-left: 1rem !important; padding-right: 1rem !important; padding-top: 0.375rem !important; padding-bottom: 0.375rem !important; background-color: rgba(39, 39, 42, 1) !important; border: 1px solid rgba(30, 58, 138, 0.3) !important; border-radius: 9999px !important; gap: 0.5rem !important;">
              <span style="color: ${primaryColor} !important;">🔒</span>
              <span class="text-[10px] font-black uppercase tracking-[0.2em]" style="font-size: 10px !important; color: rgba(191, 219, 254, 1) !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.2em !important;">
                Strictly Confidential
              </span>
            </div>
            <p class="text-[9px] leading-relaxed font-medium" style="font-size: 9px !important; color: #52525b !important; line-height: 1.625 !important; font-weight: 500 !important;">
              본 문서는 기술적/영업적 기밀을 포함하고 있으므로 무단 복제 및 유출을 금합니다.<br/>
              © 2025 Toktokhan.dev. All rights reserved.
            </p>
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
  brandColor3?: string,
): string {
  const primaryColor = brandColor1 || '#4f46e5'; // 기본값: indigo-600
  const secondaryColor = brandColor2 || '#1f2937'; // 기본값: gray-800
  const tertiaryColor = brandColor3 || '#E31837';
  const darkBg = '#0a0c10';

  // Hex to RGBA 변환 함수
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const primaryColorRgba = hexToRgba(primaryColor, 0.05);

  // 목차 섹션 데이터
  const sections = [
    {
      id: 'I',
      title: '제안 개요',
      enTitle: 'Introduction',
      borderColor: primaryColor, // 파트 1: primaryColor
      items: ['제안사 소개', '제안 배경 및 목적', '제안의 범위', '제안의 특징 및 장점'],
    },
    {
      id: 'II',
      title: '제안 전략',
      enTitle: 'Strategy',
      borderColor: secondaryColor, // 파트 2: secondaryColor
      items: ['사업 이해 및 분석', '목표 모델 설계', '추진 전략', '기대 효과'],
    },
    {
      id: 'III',
      title: '기술 및 기능 부문',
      enTitle: 'Technical Solution',
      borderColor: primaryColor, // 파트 3: primaryColor
      items: ['시스템 목표 아키텍처', '기능 구현 방안', '보안 및 데이터 관리', '시스템 연계 방안'],
    },
    {
      id: 'IV',
      title: '사업 관리 부문',
      enTitle: 'Project Management',
      borderColor: secondaryColor, // 파트 4: secondaryColor
      items: ['추진 일정', '수행 조직 및 인력', '개발 방법론', '품질 보증 계획'],
    },
    {
      id: 'V',
      title: '사업 지원 부문',
      enTitle: 'Support & Maintenance',
      borderColor: tertiaryColor, // 파트 5: tertiaryColor
      items: ['교육 훈련 계획', '기술 이전 계획', '유지보수', '비상 대책'],
    },
  ];

  return `
    <div class="a4-page flex flex-col relative" style="background-color: ${darkBg} !important; color: white !important; position: relative !important; overflow: hidden !important; width: 210mm !important; min-height: 297mm !important;">
      
      <!-- Background Effects -->
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none" style="pointer-events: none !important;">
        <div class="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[100px]" style="background-color: ${primaryColorRgba} !important; position: absolute !important; top: -5% !important; left: -5% !important; width: 400px !important; height: 400px !important; border-radius: 9999px !important; filter: blur(100px) !important;"></div>
        <div class="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px]" style="background-color: ${hexToRgba(secondaryColor, 0.05)} !important; position: absolute !important; bottom: -5% !important; right: -5% !important; width: 400px !important; height: 400px !important; border-radius: 9999px !important; filter: blur(100px) !important;"></div>
      </div>

      <!-- Header -->
      <div class="px-16 pt-16 pb-8 z-10 relative" style="padding-left: 4rem !important; padding-right: 4rem !important; padding-top: 3rem !important; padding-bottom: 1.5rem !important; position: relative !important; z-index: 10 !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${primaryColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${primaryColor} !important; text-transform: uppercase !important;">Index</span>
        </div>
        <div class="relative" style="position: relative !important;">
          <h1 class="text-6xl font-black tracking-tighter uppercase italic opacity-5 absolute -top-8 -left-2" style="font-size: 3.75rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; color: white !important; text-transform: uppercase !important; font-style: italic !important; opacity: 0.05 !important; position: absolute !important; top: -2rem !important; left: -0.5rem !important;">Contents</h1>
          <h2 class="text-4xl font-black tracking-tight text-white relative z-10 flex items-baseline gap-4" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: white !important; position: relative !important; z-index: 10 !important; display: flex !important; align-items: baseline !important; gap: 1rem !important;">
            목 차 <span class="text-sm font-light italic tracking-widest uppercase" style="font-size: 0.875rem !important; font-weight: 300 !important; font-style: italic !important; letter-spacing: 0.1em !important; color: #71717a !important; text-transform: uppercase !important;">Table of Contents</span>
          </h2>
        </div>
      </div>

      <!-- Table of Contents Grid -->
      <div class="flex-1 px-16 z-10 relative" style="flex: 1 !important; padding-left: 4rem !important; padding-right: 4rem !important; padding-top: 0.5rem !important; padding-bottom: 0 !important; position: relative !important; z-index: 10 !important;">
        <div class="grid grid-cols-2 gap-x-12 gap-y-8" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 3rem 2rem !important;">
          ${sections
            .map(
              section => `
          <div class="relative" style="position: relative !important;">
            <!-- Roman Numeral Background -->
            <span class="absolute -top-5 -left-3 text-7xl font-black italic pointer-events-none" style="position: absolute !important; top: -1.25rem !important; left: -0.75rem !important; font-size: 4.5rem !important; font-weight: 900 !important; font-style: italic !important; color: rgba(255, 255, 255, 0.03) !important; pointer-events: none !important;">
              ${section.id}
            </span>
            
            <div class="relative border-l-[3px] pl-5 py-1" style="border-left: 3px solid ${section.borderColor} !important; padding-left: 1.25rem !important; padding-top: 0.25rem !important; padding-bottom: 0.25rem !important; position: relative !important;">
              <div class="flex items-center gap-2 mb-1" style="display: flex !important; align-items: center !important; gap: 0.5rem !important; margin-bottom: 0.25rem !important;">
                <span class="text-[9px] font-bold uppercase tracking-widest leading-none" style="font-size: 9px !important; font-weight: bold !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; line-height: 1 !important;">
                  Part ${section.id}
                </span>
              </div>
              <h3 class="text-xl font-black text-white mb-5" style="font-size: 1.25rem !important; font-weight: 900 !important; color: white !important; margin-bottom: 1rem !important;">
                ${section.title}
                <span class="block text-[9px] font-medium mt-0.5 uppercase tracking-tighter" style="display: block !important; font-size: 9px !important; font-weight: 500 !important; color: #71717a !important; margin-top: 0.125rem !important; text-transform: uppercase !important; letter-spacing: -0.025em !important;">
                  ${section.enTitle}
                </span>
              </h3>

              <ul class="space-y-3" style="display: flex !important; flex-direction: column !important; gap: 0.5rem !important;">
                ${section.items
                  .map(
                    (item, idx) => `
                <li class="flex items-center justify-between" style="display: flex !important; align-items: center !important; justify-content: space-between !important;">
                  <div class="flex items-center gap-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important;">
                    <span class="text-[9px] font-black" style="font-size: 9px !important; font-weight: 900 !important; color: #3f3f46 !important;">
                      ${section.id.toLowerCase()}.${idx + 1}
                    </span>
                    <span class="text-[14px] font-medium" style="font-size: 0.875rem !important; font-weight: 500 !important; color: #a1a1aa !important;">
                      ${item}
                    </span>
                  </div>
                  <span style="color: #27272a !important; font-size: 0.75rem !important;">→</span>
                </li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>

      <!-- Footer Area -->
      <div class="px-16 pb-12 z-10 relative" style="padding-left: 4rem !important; padding-right: 4rem !important; padding-top: 0.5rem !important; padding-bottom: 1.5rem !important; position: relative !important; z-index: 10 !important;">
        <div class="h-px w-full mb-6 opacity-30" style="height: 1px !important; width: 100% !important; background-color: #27272a !important; margin-bottom: 0.75rem !important; opacity: 0.3 !important;"></div>
        <div class="flex justify-between items-center opacity-40" style="display: flex !important; justify-content: space-between !important; align-items: center !important; opacity: 0.4 !important;">
          <div class="flex items-center gap-2" style="display: flex !important; align-items: center !important; gap: 0.5rem !important;">
            <span class="text-xs font-black tracking-tighter uppercase" style="font-size: 0.75rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; color: white !important; text-transform: uppercase !important;">TOKTOKHAN.DEV</span>
          </div>
          <div class="flex items-center gap-6" style="display: flex !important; align-items: center !important; gap: 1.5rem !important;">
            <div class="flex items-center gap-2" style="display: flex !important; align-items: center !important; gap: 0.5rem !important;">
              <span style="color: ${primaryColor} !important;">🔒</span>
              <span class="text-[8px] font-black uppercase tracking-widest leading-none" style="font-size: 8px !important; color: #71717a !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; line-height: 1 !important;">Confidential Document</span>
            </div>
            <div class="w-px h-3" style="width: 1px !important; height: 0.75rem !important; background-color: #27272a !important;"></div>
            <span class="text-[8px] font-bold tracking-widest uppercase leading-none" style="font-size: 8px !important; color: #71717a !important; font-weight: bold !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; line-height: 1 !important;">Page 02</span>
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
  const secondaryColor = data.brandColor2 || '#1f2937'; // 기본값: gray-800
  const tertiaryColor = data.brandColor3 || '#0a0c10';
  const darkBg = '#0a0c10';

  // 브랜드 컬러를 rgba로 변환 (투명도 20%용)
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const primaryColorRgba = hexToRgba(primaryColor, 0.05);
  const secondaryColorRgba = hexToRgba(secondaryColor, 0.05);

  // Promise 데이터
  const promises = [
    {
      id: '01',
      title: '검증된 전문성',
      desc: '다년간의 프로젝트 경험과\n검증된 기술력으로\n안정적인 시스템 구축',
      bgColor: `bg-[${hexToRgba(primaryColor, 0.2)}]`,
      color: primaryColor,
    },
    {
      id: '02',
      title: '핵심 인력 투입',
      desc: '최고의 전문가들이\n직접 참여하여\n품질을 보장합니다',
      bgColor: `bg-[${hexToRgba(primaryColor, 0.2)}]`,
      color: primaryColor,
    },
    {
      id: '03',
      title: '상생의 파트너십',
      desc: '단순 계약이 아닌\n장기적인 파트너로서\n함께 성장합니다',
      bgColor: `bg-[${hexToRgba(primaryColor, 0.2)}]`,
      color: primaryColor,
    },
  ];

  return `
    <div class="a4-page flex flex-col relative" style="background-color: ${darkBg} !important; color: white !important; position: relative !important; overflow: hidden !important; width: 210mm !important; min-height: 297mm !important;">
      
      <!-- Background Effects -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden" style="position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; pointer-events: none !important; overflow: hidden !important;">
        <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px]" style="position: absolute !important; top: -10% !important; right: -10% !important; width: 500px !important; height: 500px !important; border-radius: 9999px !important; filter: blur(120px) !important; background-color: ${primaryColorRgba} !important;"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style="position: absolute !important; bottom: -10% !important; left: -10% !important; width: 500px !important; height: 500px !important; border-radius: 9999px !important; filter: blur(100px) !important; background-color: ${secondaryColorRgba} !important;"></div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 px-16 pt-20 flex flex-col justify-center items-center z-10 text-center" style="flex: 1 !important; padding-left: 4rem !important; padding-right: 4rem !important; padding-top: 5rem !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; text-align: center !important; position: relative !important; z-index: 10 !important;">
        
        <!-- Logo Collaboration Section -->
        <div class="flex items-center justify-center gap-8 mb-12" style="display: flex !important; align-items: center !important; justify-content: center !important; gap: 2rem !important; margin-bottom: 3rem !important;">
          <div class="flex flex-col items-center gap-2" style="display: flex !important; flex-direction: column !important; align-items: center !important; gap: 0.5rem !important;">
            ${
              data.clientLogo
                ? `<img src="${data.clientLogo}" alt="${data.clientCompanyName} 로고" class="w-16 h-16" style="width: 4rem !important; height: 4rem !important; object-fit: contain !important;" />`
                : `<svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 4rem !important; height: 4rem !important;">
                    <path d="M50 0L0 50L50 100L100 50L50 0Z" fill="${tertiaryColor}"/>
                    <path d="M50 0V100L100 50L50 0Z" fill="${primaryColor}"/>
                    <circle cx="28" cy="42" r="6" fill="white"/>
                    <circle cx="28" cy="58" r="6" fill="white"/>
                    <circle cx="72" cy="50" r="6" fill="white"/>
                  </svg>`
            }
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase" style="font-size: 9px !important; font-weight: bold !important; letter-spacing: 0.2em !important; color: #71717a !important; text-transform: uppercase !important;">${data.clientCompanyName || 'Client'}</span>
          </div>
          
          <div class="h-6 w-px rotate-12" style="height: 1.5rem !important; width: 1px !important; background-color: #27272a !important; transform: rotate(12deg) !important;"></div>
          <span class="text-lg font-light" style="font-size: 1.125rem !important; font-weight: 300 !important; color: #52525b !important;">X</span>
          <div class="h-6 w-px rotate-12" style="height: 1.5rem !important; width: 1px !important; background-color: #27272a !important; transform: rotate(12deg) !important;"></div>

          <div class="flex flex-col items-center gap-2" style="display: flex !important; flex-direction: column !important; align-items: center !important; gap: 0.5rem !important;">
            <img src="${data.ourLogo || '/images/tokdev-logo.jpg'}" alt="TOKTOKHAN.DEV 로고" class="w-16 h-16 rounded-lg" style="width: 4rem !important; height: 4rem !important; border-radius: 0.5rem !important; object-fit: contain !important;" />
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase" style="font-size: 9px !important; font-weight: bold !important; letter-spacing: 0.2em !important; color: #71717a !important; text-transform: uppercase !important;">Toktokhan</span>
          </div>
        </div>

        <!-- Main Title -->
        <div class="mb-8" style="margin-bottom: 2rem !important;">
          <h1 class="text-4xl font-black leading-[1.2] tracking-tight mb-5" style="font-size: 2.25rem !important; font-weight: 900 !important; line-height: 1.2 !important; letter-spacing: -0.025em !important; margin-bottom: 1.25rem !important; color: white !important;">
            ${data.clientCompanyName || '고객사'}의 <span style="color: ${primaryColor} !important; font-style: italic !important;">성공적인 미래,</span><br />
            <span style="text-decoration: underline !important; text-decoration-color: ${tertiaryColor} !important; text-decoration-thickness: 3px !important; text-underline-offset: 0.5rem !important; color: white !important;">TOKTOKHAN.DEV</span>가 함께하겠습니다.
          </h1>
          <div class="h-1 w-20 mx-auto rounded-full" style="height: 0.25rem !important; width: 5rem !important; margin-left: auto !important; margin-right: auto !important; border-radius: 9999px !important; background: linear-gradient(to right, ${primaryColor}, ${tertiaryColor}) !important;"></div>
        </div>

        <!-- Core Message -->
        <p class="text-xl font-light leading-relaxed mb-14 max-w-2xl" style="font-size: 1.25rem !important; font-weight: 300 !important; color: #a1a1aa !important; line-height: 1.75 !important; margin-bottom: 3.5rem !important; max-width: 42rem !important;">
          "안정적인 <span style="color: white !important; font-weight: 500 !important;">기술력</span>과 책임감 있는 <span style="color: white !important; font-weight: 500 !important;">수행</span>으로<br />
          무결점 시스템 구축을 약속합니다."
        </p>

        <!-- Three Promises Grid -->
        <div class="grid grid-cols-3 gap-5 w-full max-w-4xl mb-16" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 1.25rem !important; width: 100% !important; max-width: 56rem !important; margin-bottom: 4rem !important;">
          ${promises
            .map(
              p => `
          <div class="relative group p-6 rounded-2xl border backdrop-blur-sm" style="position: relative !important; padding: 1.5rem !important; border-radius: 1rem !important; background-color: ${hexToRgba(secondaryColor, 0.3)} !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; backdrop-filter: blur(4px) !important;">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5" style="width: 3rem !important; height: 3rem !important; border-radius: 0.75rem !important; display: flex !important; align-items: center !important; justify-content: center !important; margin-left: auto !important; margin-right: auto !important; margin-bottom: 1.25rem !important; background-color: ${hexToRgba(p.color, 0.2)} !important;">
              <span style="font-size: 1.5rem !important; font-weight: 900 !important; color: ${p.color} !important;">${p.id}</span>
            </div>
            <span class="text-[9px] font-black tracking-[0.3em] mb-2 block uppercase" style="font-size: 9px !important; font-weight: 900 !important; letter-spacing: 0.3em !important; color: #52525b !important; margin-bottom: 0.5rem !important; display: block !important; text-transform: uppercase !important;">Promise ${p.id}</span>
            <h3 class="text-base font-bold text-white mb-3" style="font-size: 1rem !important; font-weight: bold !important; color: white !important; margin-bottom: 0.75rem !important;">${p.title}</h3>
            <p class="text-[13px] leading-relaxed whitespace-pre-line font-medium" style="font-size: 13px !important; color: #71717a !important; line-height: 1.75 !important; white-space: pre-line !important; font-weight: 500 !important;">
              ${p.desc}
            </p>
          </div>
          `,
            )
            .join('')}
        </div>

        <!-- Signature Area -->
        <div class="relative group" style="position: relative !important;">
          <p class="text-[10px] tracking-[0.4em] uppercase mb-3 font-bold" style="font-size: 10px !important; letter-spacing: 0.4em !important; color: #71717a !important; margin-bottom: 0.75rem !important; text-transform: uppercase !important; font-weight: bold !important;">Trusted Partner</p>
          <h2 class="text-3xl font-black tracking-tighter text-white mb-2 leading-none" style="font-size: 1.875rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; color: white !important; margin-bottom: 0.5rem !important; line-height: 1 !important;">TOKTOKHAN.DEV</h2>
          <div class="flex items-center justify-center gap-1.5 mt-4" style="display: flex !important; align-items: center !important; justify-content: center !important; gap: 0.375rem !important; margin-top: 1rem !important;">
            <div class="w-1 h-1 rounded-full" style="width: 0.25rem !important; height: 0.25rem !important; border-radius: 9999px !important; background-color: ${primaryColor} !important;"></div>
            <div class="w-10 h-[1px]" style="width: 2.5rem !important; height: 1px !important; background-color: #27272a !important;"></div>
            <div class="w-1 h-1 rounded-full" style="width: 0.25rem !important; height: 0.25rem !important; border-radius: 9999px !important; background-color: ${tertiaryColor} !important;"></div>
          </div>
        </div>
      </div>

      <!-- Footer Area -->
      <div class="cover-footer px-16 pb-16 z-10 relative" style="padding-left: 4rem !important; padding-right: 4rem !important; padding-bottom: 2rem !important; padding-top: 1rem !important; position: relative !important; z-index: 10 !important;">
        <div class="h-px w-full mb-10" style="height: 1px !important; width: 100% !important; background: linear-gradient(to right, rgba(30, 58, 138, 0.5), rgba(39, 39, 42, 0.8), transparent) !important; margin-bottom: 1.5rem !important;"></div>
        
        <div class="flex justify-between items-end" style="display: flex !important; justify-content: space-between !important; align-items: flex-end !important;">
          <!-- Agency Info -->
          <div class="space-y-6" style="display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
            
            
            <div class="flex gap-5" style="display: flex !important; gap: 1rem !important;">
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: ${tertiaryColor} !important;">📍</span> Address
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">서울시 마포구 동교로 12안길 39</p>
              </div>
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: ${primaryColor} !important;">🌐</span> Contact
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">sales@toktokhan.dev</p>
              </div>
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: #71717a !important;">📞</span> Phone
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">010-2493-2906</p>
              </div>
            </div>
          </div>

          <!-- Security & Copyright -->
          <div class="text-right flex flex-col items-end gap-3" style="text-align: right !important; display: flex !important; flex-direction: column !important; align-items: flex-end !important; gap: 0.75rem !important;">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full border gap-2" style="display: inline-flex !important; align-items: center !important; padding-left: 1rem !important; padding-right: 1rem !important; padding-top: 0.375rem !important; padding-bottom: 0.375rem !important; background-color: rgba(39, 39, 42, 1) !important; border: 1px solid rgba(30, 58, 138, 0.3) !important; border-radius: 9999px !important; gap: 0.5rem !important;">
              <span class="text-[10px] font-black uppercase tracking-[0.2em]" style="font-size: 10px !important; color: rgba(191, 219, 254, 1) !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.2em !important;">
                Confidential Partnership
              </span>
            </div>
            <p class="text-[9px] leading-relaxed font-medium" style="font-size: 9px !important; color: #52525b !important; line-height: 1.625 !important; font-weight: 500 !important;">
              본 문서는 기술적/영업적 기밀을 포함하고 있으므로 무단 복제 및 유출을 금합니다.<br/>
              © 2025 Toktokhan.dev. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 본문 섹션 1: 제안 개요 (Introduction)
export interface BodySection1Data {
  // 1.1 제안 배경 및 목적
  background?: {
    quote?: string; // 인용구
    marketBackground?: string; // 시장 배경
    primaryGoal?: string; // 주요 목표
  };
  // 1.2 제안의 범위
  scope?: string[]; // 범위 항목들 (최대 3개)
  // 1.3 제안사의 특징 및 장점
  strengths?: Array<{
    title: string; // 제목
    description: string; // 설명
  }>; // 최대 3개
}

export function generateBodySection1Template(data: BodySection1Data, brandColor1?: string): string {
  const primaryColor = brandColor1 || '#4f46e5';
  const blueColor = '#3b82f6'; // blue-500

  // 기본값 설정
  const background = data.background || {
    quote: '디지털 트랜스포메이션을 통한 고객 경험의 혁신적 재설계 및 시장 경쟁 우위 확보',
    marketBackground:
      '경쟁사의 공격적인 디지털 전환에 대응하고 차별화된 경험을 제공해야 할 시점입니다.',
    primaryGoal:
      '사용자 데이터 기반의 개인화 추천과 심리스한 프로세스 구축으로 전환율을 극대화합니다.',
  };

  const scope = data.scope || ['UI/UX Renewal', 'Platform Core Dev', 'Back-office System'];

  const strengths = data.strengths || [
    { title: 'Specialized Skill', description: '국내 최고 수준의\n푸드테크 기술력' },
    { title: 'Proven Track', description: '다수의 대형 플랫폼\n수행 실적 보유' },
    { title: 'Scalable Tech', description: '확장 가능한\n클라우드 아키텍처' },
  ];

  return `
    <div class="a4-page flex flex-col" style="background-color: #0a0c10 !important; color: white !important; position: relative !important; overflow: visible !important; width: 210mm !important; min-height: 297mm !important; height: auto !important; padding: 2rem !important; margin: 0 !important; max-width: 210mm !important;">
      
      <!-- Main Title -->
      <div class="mb-6" style="margin-bottom: 1.5rem !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${primaryColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${primaryColor} !important; text-transform: uppercase !important;">Part I</span>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: white !important; margin-bottom: 0.5rem !important;">
          제안 개요
          <span class="block text-sm font-light italic tracking-widest uppercase mt-1" style="display: block !important; font-size: 0.875rem !important; font-weight: 300 !important; font-style: italic !important; letter-spacing: 0.1em !important; color: #71717a !important; text-transform: uppercase !important; margin-top: 0.25rem !important;">Project Overview</span>
        </h1>
        <p class="text-sm text-zinc-400 mt-2" style="font-size: 0.875rem !important; color: #a1a1aa !important; margin-top: 0.5rem !important;">
          본 사업의 배경, 목적 및 수행 범위를 명확히 정의합니다.
        </p>
      </div>

      <div class="flex-1 space-y-6" style="flex: 1 !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
        
        <!-- 1.1 제안 배경 및 목적 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">🎯</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                1.1 제안 배경 및 목적
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Context & Objectives</p>
            </div>
          </div>
          
          <div class="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl grid grid-cols-12 gap-6 items-center" style="background-color: rgba(24, 24, 27, 0.3) !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; padding: 1.5rem !important; border-radius: 1rem !important; display: grid !important; grid-template-columns: repeat(12, minmax(0, 1fr)) !important; gap: 1.5rem !important; align-items: center !important;">
            <div class="col-span-8" style="grid-column: span 8 / span 8 !important;">
              <p class="text-zinc-400 leading-relaxed mb-4 font-light italic border-l-2 pl-4 text-sm" style="color: #a1a1aa !important; line-height: 1.5 !important; margin-bottom: 1rem !important; font-weight: 300 !important; font-style: italic !important; border-left: 2px solid ${blueColor} !important; padding-left: 1rem !important; font-size: 0.875rem !important;">
                "${background.quote}"
              </p>
              <div class="grid grid-cols-2 gap-3" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.75rem !important;">
                <div class="bg-zinc-950 p-4 rounded-xl border border-white/5" style="background-color: #09090b !important; padding: 1rem !important; border-radius: 0.75rem !important; border: 1px solid rgba(255, 255, 255, 0.05) !important;">
                  <p class="text-xs font-bold mb-1.5 uppercase tracking-tighter" style="font-size: 0.75rem !important; font-weight: bold !important; color: ${blueColor} !important; margin-bottom: 0.375rem !important; text-transform: uppercase !important; letter-spacing: -0.025em !important;">Market Background</p>
                  <p class="text-xs text-zinc-300 leading-relaxed" style="font-size: 0.75rem !important; color: #d4d4d8 !important; line-height: 1.5 !important;">${background.marketBackground}</p>
                </div>
                <div class="bg-zinc-950 p-4 rounded-xl border border-white/5" style="background-color: #09090b !important; padding: 1rem !important; border-radius: 0.75rem !important; border: 1px solid rgba(255, 255, 255, 0.05) !important;">
                  <p class="text-xs font-bold mb-1.5 uppercase tracking-tighter" style="font-size: 0.75rem !important; font-weight: bold !important; color: ${blueColor} !important; margin-bottom: 0.375rem !important; text-transform: uppercase !important; letter-spacing: -0.025em !important;">Primary Goal</p>
                  <p class="text-xs text-zinc-300 leading-relaxed" style="font-size: 0.75rem !important; color: #d4d4d8 !important; line-height: 1.5 !important;">${background.primaryGoal}</p>
                </div>
              </div>
            </div>
            <div class="col-span-4 flex justify-center opacity-10" style="grid-column: span 4 / span 4 !important; display: flex !important; justify-content: center !important; opacity: 0.1 !important;">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${blueColor} !important;">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
          </div>
        </section>

        <!-- 1.2 제안의 범위 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">📦</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                1.2 제안의 범위
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Project Scope</p>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-3" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 0.75rem !important; width: 100% !important;">
            ${scope
              .slice(0, 3)
              .map(
                item => `
            <div class="p-4 bg-zinc-900/40 border border-white/5 rounded-xl" style="padding: 1rem !important; background-color: rgba(24, 24, 27, 0.4) !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 0.75rem !important; width: 100% !important; box-sizing: border-box !important;">
              <div class="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center mb-3 border border-white/5" style="width: 2.5rem !important; height: 2.5rem !important; background-color: #09090b !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; margin-bottom: 0.75rem !important; border: 1px solid rgba(255, 255, 255, 0.05) !important;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${blueColor} !important;">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <p class="text-xs font-bold text-zinc-200" style="font-size: 0.75rem !important; font-weight: bold !important; color: #e4e4e7 !important;">${item}</p>
            </div>
            `,
              )
              .join('')}
          </div>
        </section>

        <!-- 1.3 제안사의 특징 및 장점 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">⚡</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                1.3 제안사의 특징 및 장점
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Key Strengths</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 p-6 rounded-2xl" style="background: linear-gradient(to bottom right, rgba(37, 99, 235, 0.1), transparent) !important; border: 1px solid rgba(37, 99, 235, 0.2) !important; padding: 1.5rem !important; border-radius: 1rem !important; width: 100% !important; box-sizing: border-box !important;">
            <div class="grid grid-cols-3 gap-6" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 1.5rem !important; width: 100% !important;">
              ${strengths
                .slice(0, 3)
                .map(
                  (item, i) => `
              <div>
                <p class="text-3xl font-black italic mb-1.5" style="font-size: 1.875rem !important; font-weight: 900 !important; font-style: italic !important; color: ${blueColor} !important; margin-bottom: 0.375rem !important;">0${i + 1}</p>
                <p class="text-sm font-bold text-zinc-100 mb-1.5" style="font-size: 0.875rem !important; font-weight: bold !important; color: #f4f4f5 !important; margin-bottom: 0.375rem !important;">${item.title}</p>
                <p class="text-[11px] text-zinc-500 leading-tight whitespace-pre-line" style="font-size: 11px !important; color: #71717a !important; line-height: 1.4 !important; white-space: pre-line !important;">${item.description}</p>
              </div>
              `,
                )
                .join('')}
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

// HTML 래퍼 (공통 헤더/스타일)
export function generateHTMLWrapper(
  bodyContent: string,
  font?: string,
  brandColor1?: string,
  brandColor2?: string,
  brandColor3?: string,
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
      --secondary: ${brandColor2};
      --tertiary: ${brandColor3};
    }
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
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
      /* 표지 Top Header는 양쪽 끝 정렬 유지 */
      .a4-page:first-child .cover-top-header {
        display: flex !important;
        flex-direction: row !important;
        align-items: baseline !important;
        justify-content: space-between !important;
        text-align: left !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .a4-page:first-child .cover-top-header > div:first-child {
        flex-shrink: 0 !important;
      }
      .a4-page:first-child .cover-top-header > div:last-child {
        margin-left: auto !important;
        flex-shrink: 0 !important;
        text-align: right !important;
      }
      /* 표지 Footer는 양쪽 끝 정렬 유지 */
      .a4-page:first-child .cover-footer {
        display: block !important;
        text-align: left !important;
      }
      .a4-page:first-child .cover-footer > div:first-of-type {
        display: block !important;
      }
      .a4-page:first-child .cover-footer > div:last-of-type {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: flex-end !important;
        text-align: left !important;
      }
      /* 마무리 페이지 (세 번째 a4-page) - 표지와 동일한 패딩 처리 */
      .a4-page:nth-child(3) {
        padding: 0 !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .a4-page:nth-child(3) > div {
        width: 100% !important;
      }
      /* 마무리 Footer는 표지와 동일하게 처리 */
      .a4-page:nth-child(3) .cover-footer {
        display: block !important;
        text-align: left !important;
      }
      .a4-page:nth-child(3) .cover-footer > div:first-of-type {
        display: block !important;
      }
      .a4-page:nth-child(3) .cover-footer > div:last-of-type {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: flex-end !important;
        text-align: left !important;
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
      /* 본문 섹션 1 (제안 개요) - 내용이 길면 자동으로 다음 페이지로 */
      .a4-page[style*="background-color: #0a0c10"] {
        page-break-after: auto !important;
        min-height: auto !important;
        height: auto !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        text-align: left !important;
        padding: 0 !important;
        width: 210mm !important;
        max-width: 210mm !important;
      }
      /* 본문 섹션 1 내부 컨테이너 중앙정렬 제거 */
      .a4-page[style*="background-color: #0a0c10"] > div {
        align-items: flex-start !important;
        justify-content: flex-start !important;
        text-align: left !important;
        width: 100% !important;
      }
      /* 본문 섹션 내부 섹션들이 페이지 중간에서 잘리지 않도록 */
      .a4-page[style*="background-color: #0a0c10"] section {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        width: 100% !important;
      }
      /* 본문 섹션 1의 그리드 컨테이너가 전체 너비 사용 */
      .a4-page[style*="background-color: #0a0c10"] .grid {
        width: 100% !important;
        max-width: 100% !important;
      }
      /* 본문 섹션 1의 내용이 한 페이지를 넘으면 자동으로 다음 페이지로 */
      .a4-page[style*="background-color: #0a0c10"] > div:last-child {
        page-break-inside: auto !important;
        break-inside: auto !important;
      }
    }
  </style>
</head>
<body class="bg-white">
  ${bodyContent}
</body>
</html>`;
}
