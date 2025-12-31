/* 제안서 표지 템플릿 */
import type { TemplateData } from './types';
import { getContrastTextColorWithGray } from './constants';

export async function generateCoverTemplate(
  data: TemplateData,
  keywordCards?: Array<{ icon?: string; title: string; sub?: string }>,
  description?: string,
): Promise<string> {
  // 브랜드 컬러 추출 (기본값: indigo-600, gray-800)
  const primaryColor = data.brandColor1 || '#4f46e5'; // 기본값: indigo-600
  const secondaryColor = data.brandColor2 || '#1f2937'; // 기본값: gray-800
  const tertiaryColor = data.brandColor3 || '#0a0c10';

  // 배경색 밝기에 따라 텍스트 색상 결정
  const textColors = getContrastTextColorWithGray(tertiaryColor);

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
    <div class="a4-page flex flex-col relative" style="background-color: ${tertiaryColor} !important; color: ${textColors.primary} !important; position: relative !important; overflow: hidden !important; width: 210mm !important; min-height: 297mm !important;">
      
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
              <h2 class="text-4xl font-black italic tracking-tighter leading-none" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; line-height: 1 !important; font-style: italic !important; color: ${textColors.primary} !important;">
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
            <span class="block text-white drop-shadow-sm leading-tight uppercase whitespace-pre-line" style="display: block !important; color: ${textColors.primary} !important; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important; line-height: 1.1 !important; text-transform: uppercase !important; white-space: pre-line !important; text-align: left !important; margin-top: 0rem !important; padding-top: 0 !important; word-break: keep-all !important; overflow-wrap: break-word !important; hyphens: auto !important;">
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
            <p class="text-sm font-medium" style="font-size: 0.875rem !important; color: ${textColors.secondary} !important; font-weight: 500 !important;">
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
              <span class="text-xl font-black tracking-tighter text-white" style="font-size: 1.25rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; color: ${textColors.primary} !important;">TOKTOKHAN.DEV</span>
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
