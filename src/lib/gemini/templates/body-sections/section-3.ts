/*본문 섹션 3: 기술 및 기능 부문 (Part III: Technical Solution)*/
import type { BodySection3Data } from '../types';
import {
  getContrastTextColorWithGray,
  getCardTextColor,
  hexToRgba,
  getA4PageContainerStyle,
  getBrandColors,
} from '../constants';

export function generateBodySection3Template(
  data: BodySection3Data,
  brandColor1?: string,
  brandColor2?: string,
  brandColor3?: string,
): string {
  // 브랜드 컬러 설정
  const { primaryColor, secondaryColor, tertiaryColor } = getBrandColors(
    brandColor1,
    brandColor2,
    brandColor3,
  );

  // 배경색 밝기에 따라 텍스트 색상 결정
  const textColors = getContrastTextColorWithGray(tertiaryColor);

  // 카드 배경색에 따른 텍스트 색상 계산
  const cardTextColors = getCardTextColor(secondaryColor, tertiaryColor, 0.4);
  const darkCardTextColors = getCardTextColor(tertiaryColor, tertiaryColor, 0.3);

  // 미팅 전사록 기반으로 Gemini가 생성한 데이터 사용 (기본값 없음)
  const architecture = data.architecture || {
    frontend: [],
    coreHub: '',
    backend: [],
  };

  const features = data.features || [];

  const security = data.security || [];

  const integrations = data.integrations || [];

  return `
    <div class="a4-page body-section flex flex-col" style="${getA4PageContainerStyle(tertiaryColor, textColors.primary)}">
      
      <!-- Main Title -->
      <div class="mb-6" style="margin-bottom: 1.5rem !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${primaryColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${primaryColor} !important; text-transform: uppercase !important;">Part III</span>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: ${textColors.primary} !important; margin-bottom: 0.5rem !important;">
          기술 및 기능 부문
          <span class="block text-sm font-light italic tracking-widest uppercase mt-1" style="display: block !important; font-size: 0.875rem !important; font-weight: 300 !important; font-style: italic !important; letter-spacing: 0.1em !important; color: #71717a !important; text-transform: uppercase !important; margin-top: 0.25rem !important;">Technical Solution</span>
        </h1>
        <p class="text-sm text-zinc-400 mt-2" style="font-size: 0.875rem !important; color: #a1a1aa !important; margin-top: 0.5rem !important;">
          안정적이고 유연한 시스템 구축을 위한 핵심 기술 아키텍처를 제시합니다.
        </p>
      </div>

      <div class="flex-1 space-y-6" style="flex: 1 !important; display: flex !important; flex-direction: column !important; gap: 0.375rem !important;">
        
        <!-- 3.1 시스템 목표 아키텍처 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.5rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">📚</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                3.1 시스템 목표 아키텍처
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Cloud-Native Structure</p>
            </div>
          </div>
          
          <div class="bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl p-8 flex justify-center" style="background-color: ${hexToRgba(tertiaryColor, 0.15)} !important; border: 1px dashed ${hexToRgba(primaryColor, 0.12)} !important; border-radius: 1rem !important; padding: 1.25rem 2rem !important; display: flex !important; justify-content: center !important; width: 100% !important;">
            <div class="flex items-center gap-6" style="display: flex !important; align-items: center !important; gap: 1.5rem !important;">
              <div class="flex flex-col gap-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important;">
                ${
                  architecture.frontend
                    ?.slice(0, 2)
                    .map(
                      (item, i) => `
                <div class="w-16 h-16 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center" style="width: 4rem !important; height: 4rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${i === 0 ? primaryColor : '#71717a'} !important;">
                    ${
                      i === 0
                        ? '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>'
                        : '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>'
                    }
                  </svg>
                </div>
                `,
                    )
                    .join('') || ''
                }
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #27272a !important;">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <div class="w-36 h-36 rounded-full border-4 border-blue-600/10 flex items-center justify-center relative" style="width: 9rem !important; height: 9rem !important; border-radius: 9999px !important; border: 4px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; align-items: center !important; justify-content: center !important; position: relative !important;">
                <div class="w-28 h-28 bg-zinc-950 border-2 border-blue-600 rounded-2xl flex flex-col items-center justify-center gap-2" style="width: 7rem !important; height: 7rem !important; background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border: 2px solid ${primaryColor} !important; border-radius: 1rem !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 0.5rem !important;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                  <span class="text-[9px] font-black text-white italic tracking-[0.2em]" style="font-size: 9px !important; font-weight: 900 !important; color: ${textColors.primary} !important; font-style: italic !important; letter-spacing: 0.2em !important;">${architecture.coreHub}</span>
                </div>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #27272a !important;">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <div class="flex flex-col gap-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important;">
                ${
                  architecture.backend
                    ?.slice(0, 2)
                    .map(
                      item => `
                <div class="w-32 p-3 bg-zinc-900 rounded-xl border border-white/5 text-center text-xs font-bold text-zinc-400" style="width: 8rem !important; padding: 0.75rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; text-align: center !important; font-size: 0.75rem !important; font-weight: bold !important; color: ${cardTextColors.secondary} !important;">${item}</div>
                `,
                    )
                    .join('') || ''
                }
              </div>
            </div>
          </div>
        </section>

        <!-- 3.2 기능 구현 방안 & 3.3 보안 및 데이터 관리 -->
        <section class="grid grid-cols-2 gap-6" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1rem !important; width: 100% !important;">
          <!-- 3.2 기능 구현 방안 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.5rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
                <span style="font-size: 1.25rem !important;">💻</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                  3.2 기능 구현 방안
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Functional Implementation</p>
              </div>
            </div>
            <ul class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.5rem !important; list-style: none !important; padding: 0 !important; margin: 0 !important;">
              ${
                features
                  ?.slice(0, 3)
                  .map(
                    feature => `
              <li class="flex items-start gap-3 p-3 bg-zinc-900/20 border border-white/5 rounded-xl" style="display: flex !important; align-items: flex-start !important; gap: 0.75rem !important; padding: 0.5rem !important; background-color: ${hexToRgba(secondaryColor, 0.3)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; border-radius: 0.75rem !important;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important; margin-top: 0.125rem !important; flex-shrink: 0 !important;">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span class="text-xs font-medium text-zinc-400" style="font-size: 0.75rem !important; font-weight: 500 !important; color: ${cardTextColors.secondary} !important;">${feature}</span>
              </li>
              `,
                  )
                  .join('') || ''
              }
            </ul>
          </div>
          
          <!-- 3.3 보안 및 데이터 관리 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.5rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
                <span style="font-size: 1.25rem !important;">🛡️</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                  3.3 보안 및 데이터 관리
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Security Framework</p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-3" style="display: flex !important; flex-direction: column !important; gap: 0.5rem !important; width: 100% !important;">
              ${
                security
                  ?.slice(0, 2)
                  .map(
                    item => `
              <div class="p-4 bg-zinc-950 border border-white/5 rounded-xl flex items-center gap-3" style="padding: 1rem !important; background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; border-radius: 0.75rem !important; display: flex !important; align-items: center !important; gap: 0.75rem !important;">
                <div class="w-2 h-2 rounded-full bg-blue-500" style="width: 0.5rem !important; height: 0.5rem !important; border-radius: 9999px !important; background-color: ${primaryColor} !important;"></div>
                <span class="text-xs text-zinc-300 font-bold" style="font-size: 0.75rem !important; color: ${darkCardTextColors.secondary} !important; font-weight: bold !important;">${item}</span>
              </div>
              `,
                  )
                  .join('') || ''
              }
            </div>
          </div>
        </section>

        <!-- 3.4 시스템 연계 방안 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-4" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.5rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">⚙️</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                3.4 시스템 연계 방안
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">System Integration Hub</p>
            </div>
          </div>
          
          <div style="display: flex !important; flex-direction: column !important; gap: 0.5rem !important; width: 100% !important;">
            <!-- 시각적 연계 다이어그램 (3.1 스타일 참고) -->
            <div style="background-color: ${hexToRgba(tertiaryColor, 0.15)} !important; border: 1px dashed ${hexToRgba(primaryColor, 0.12)} !important; border-radius: 1rem !important; padding: 1rem !important; position: relative !important; overflow: hidden !important; display: flex !important; justify-content: center !important; width: 100% !important;">
              <div style="position: absolute !important; inset: 0 !important; background: radial-gradient(circle at center, ${hexToRgba(primaryColor, 0.08)} 0%, transparent 70%) !important; opacity: 0.6 !important; pointer-events: none !important; z-index: 0 !important;"></div>
              
              <!-- 배경 링 -->
              <div style="position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 10rem !important; height: 10rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.4)} !important; border-radius: 9999px !important; pointer-events: none !important; z-index: 0 !important;"></div>
              <div style="position: absolute !important; top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 13rem !important; height: 13rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.5)} !important; border-radius: 9999px !important; pointer-events: none !important; z-index: 0 !important;"></div>

              <div class="flex items-center gap-3" style="display: flex !important; align-items: center !important; gap: 0.5rem !important; position: relative !important; z-index: 10 !important;">
                <!-- 좌측: POS, ERP -->
                <div class="flex flex-col gap-3" style="display: flex !important; flex-direction: column !important; gap: 0.5rem !important;">
                  <div class="w-16 h-16 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center" style="width: 3.5rem !important; height: 3.5rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </div>
                  <div class="w-16 h-16 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center" style="width: 3.5rem !important; height: 3.5rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                      <line x1="6" y1="6" x2="6.01" y2="6"></line>
                      <line x1="6" y1="18" x2="6.01" y2="18"></line>
                    </svg>
                  </div>
                </div>
                <!-- 중앙 허브: Integration Engine -->
                <div class="w-36 h-36 rounded-full border-4 border-blue-600/10 flex flex-col items-center justify-center gap-2 relative" style="width: 7.5rem !important; height: 7.5rem !important; border-radius: 9999px !important; border: 3px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 0.375rem !important; position: relative !important;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                  <span class="text-[8px] font-black text-white italic tracking-[0.15em]" style="font-size: 8px !important; font-weight: 900 !important; color: ${textColors.primary} !important; font-style: italic !important; letter-spacing: 0.15em !important;">Integration Engine</span>
                </div>
                <!-- 우측: CRM, API -->
                <div class="flex flex-col gap-3" style="display: flex !important; flex-direction: column !important; gap: 0.5rem !important;">
                  <div class="w-16 h-16 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center" style="width: 3.5rem !important; height: 3.5rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div class="w-16 h-16 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center" style="width: 3.5rem !important; height: 3.5rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; align-items: center !important; justify-content: center !important;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- 상세 연계 설명 카드 그리드 -->
            ${(() => {
              // integrations 데이터 처리 (string[] 또는 Array<{title, description}>)
              if (!integrations || integrations.length === 0) return '';

              const integrationItems =
                typeof integrations[0] === 'string'
                  ? (integrations as string[]).map(item => ({ title: item, description: '' }))
                  : (integrations as Array<{ title: string; description: string }>);

              return `
            <div style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.5rem !important; width: 100% !important;">
              ${integrationItems
                .slice(0, 4)
                .map(
                  (item, i) => `
              <div style="background-color: ${hexToRgba(secondaryColor, 0.3)} !important; padding: 1rem !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; width: 100% !important; display: flex !important; flex-direction: column !important; gap: 0.625rem !important;">
                <div style="display: flex !important; align-items: center !important; gap: 0.5rem !important;">
                  <div style="padding: 0.375rem !important; background-color: ${hexToRgba(primaryColor, 0.1)} !important; border-radius: 0.5rem !important;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                      ${
                        i === 0
                          ? '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>'
                          : i === 1
                            ? '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>'
                            : i === 2
                              ? '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>'
                              : '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>'
                      }
                    </svg>
                  </div>
                  <h5 style="font-weight: bold !important; color: ${cardTextColors.primary} !important; font-size: 0.875rem !important; margin: 0 !important;">${item.title}</h5>
                </div>
                ${item.description ? `<p style="font-size: 0.75rem !important; color: ${cardTextColors.tertiary} !important; line-height: 1.6 !important; font-weight: 500 !important; margin: 0 !important;">${item.description}</p>` : ''}
              </div>
            `,
                )
                .join('')}
            </div>
            `;
            })()}
          </div>
        </section>
      </div>
    </div>
  `;
}
