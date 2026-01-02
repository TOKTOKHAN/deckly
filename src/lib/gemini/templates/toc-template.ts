/* 제안서 목차 템플릿 프로젝트 제안서의 목차 페이지를 생성하는 템플릿입니다. */
import { getContrastTextColorWithGray, getContrastBorderColor, hexToRgba } from './constants';

export function generateTableOfContentsTemplate(
  brandColor1?: string,
  brandColor2?: string,
  brandColor3?: string,
): string {
  const primaryColor = brandColor1 || '#4f46e5'; // 기본값: indigo-600
  const secondaryColor = brandColor2 || '#1f2937'; // 기본값: gray-800
  const tertiaryColor = brandColor3 || '#E31837';

  // 배경색 밝기에 따라 텍스트 색상 결정
  const textColors = getContrastTextColorWithGray(tertiaryColor);

  const primaryColorRgba = hexToRgba(primaryColor, 0.05);

  // 목차 섹션 데이터
  // Part 5의 border 색상은 배경색(tertiaryColor)과 겹칠 수 있으므로 보색 사용
  const part5BorderColor = getContrastBorderColor(tertiaryColor, tertiaryColor);

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
      borderColor: part5BorderColor, // 파트 5: 배경색의 보색 사용
      items: ['교육 훈련 계획', '기술 이전 계획', '유지보수', '비상 대책'],
    },
  ];

  return `
    <div class="a4-page flex flex-col relative" style="background-color: ${tertiaryColor} !important; color: ${textColors.primary} !important; position: relative !important; overflow: hidden !important; width: 210mm !important; min-height: 297mm !important;">
      
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
          <h1 class="text-6xl font-black tracking-tighter uppercase italic opacity-5 absolute -top-8 -left-2" style="font-size: 3.75rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; color: ${textColors.primary} !important; text-transform: uppercase !important; font-style: italic !important; opacity: 0.05 !important; position: absolute !important; top: -2rem !important; left: -0.5rem !important;">Contents</h1>
          <h2 class="text-4xl font-black tracking-tight text-white relative z-10 flex items-baseline gap-4" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: ${textColors.primary} !important; position: relative !important; z-index: 10 !important; display: flex !important; align-items: baseline !important; gap: 1rem !important;">
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
              <h3 class="text-xl font-black text-white mb-5" style="font-size: 1.25rem !important; font-weight: 900 !important; color: ${textColors.primary} !important; margin-bottom: 1rem !important;">
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
            <span class="text-xs font-black tracking-tighter uppercase" style="font-size: 0.75rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; color: ${textColors.primary} !important; text-transform: uppercase !important;">TOKTOKHAN.DEV</span>
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
