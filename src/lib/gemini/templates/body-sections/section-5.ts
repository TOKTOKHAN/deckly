/* 본문 섹션 5: 사업 지원 부문 (Part V: Sustainability & Support) */
import type { BodySection5Data } from '../types';
import {
  getContrastTextColorWithGray,
  getCardTextColor,
  getContrastBorderColor,
  hexToRgba,
  getA4PageContainerStyle,
  getBrandColors,
  generateSectionHeader,
  generatePageFooter,
} from '../constants';

export function generateBodySection5Template(
  data: BodySection5Data,
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

  // Part V 색상: 목차의 border 색상과 동일하게 보색 사용
  const part5Color = getContrastBorderColor(tertiaryColor, tertiaryColor);

  // 미팅 전사록 기반으로 Gemini가 생성한 데이터 사용 (기본값 없음)
  const training = data.training || [];

  const knowledgeTransfer = data.knowledgeTransfer || '';

  const maintenance = data.maintenance || [];

  const emergency = data.emergency || {
    title: '',
    description: '',
    badge: '',
  };

  return `
    <div class="a4-page body-section flex flex-col" style="${getA4PageContainerStyle(tertiaryColor, textColors.primary)}">
      ${generateSectionHeader(
        'V',
        '사업 지원 부문',
        'Sustainability & Support',
        '사업 완료 이후의 안정적인 운영 지원 및 기술 전수 계획을 제안합니다.',
        part5Color,
        textColors,
      )}

      <div class="flex-1 space-y-6" style="flex: 1 !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
        
        <!-- 5.1 교육 훈련 계획 & 5.2 기술 이전 계획 -->
        <section class="grid grid-cols-2 gap-6" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1.5rem !important; width: 100% !important;">
          <!-- 5.1 교육 훈련 계획 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
                <span style="font-size: 1.25rem !important;">📖</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                  5.1 교육 훈련 계획
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Operation Training</p>
              </div>
            </div>
            <div class="bg-zinc-900/40 p-6 rounded-2xl" style="background-color: ${hexToRgba(secondaryColor, 0.4)} !important; padding: 1.5rem !important; border-radius: 1rem !important; width: 100% !important;">
              <ul class="space-y-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important; list-style: none !important; padding: 0 !important; margin: 0 !important;">
                ${
                  training
                    ?.slice(0, 3)
                    .map(
                      item => `
                <li class="flex gap-3 text-sm text-zinc-400" style="display: flex !important; gap: 0.75rem !important; font-size: 0.875rem !important; color: ${cardTextColors.secondary} !important;">
                  <div class="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0" style="width: 0.25rem !important; height: 0.25rem !important; background-color: ${primaryColor} !important; border-radius: 9999px !important; margin-top: 0.5rem !important; flex-shrink: 0 !important;"></div>
                  <span>${item}</span>
                </li>
                `,
                    )
                    .join('') || ''
                }
              </ul>
            </div>
          </div>
          
          <!-- 5.2 기술 이전 계획 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
                <span style="font-size: 1.25rem !important;">👥</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                  5.2 기술 이전 계획
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Knowledge Transfer</p>
              </div>
            </div>
            <div class="bg-zinc-900/40 p-6 rounded-2xl h-full flex flex-col justify-center" style="background-color: rgba(24, 24, 27, 0.4) !important; padding: 1.5rem !important; border-radius: 1rem !important; height: 100% !important; display: flex !important; flex-direction: column !important; justify-content: center !important; width: 100% !important;">
              <p class="text-sm text-zinc-400 leading-relaxed font-light italic border-l-2 border-zinc-700 pl-4" style="font-size: 0.875rem !important; color: ${cardTextColors.secondary} !important; line-height: 1.5 !important; font-weight: 300 !important; font-style: italic !important; border-left: 2px solid ${hexToRgba(part5Color, 0.12)} !important; padding-left: 1rem !important;">${knowledgeTransfer}</p>
            </div>
          </div>
        </section>

        <!-- 5.3 유지보수 및 운영 지원 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">⚙️</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                5.3 유지보수 및 운영 지원
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Maintenance Service</p>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-4" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 1rem !important; width: 100% !important;">
            ${maintenance
              .slice(0, 3)
              .map(
                item => `
            <div class="p-5 bg-zinc-950 rounded-xl border border-white/5 text-center" style="padding: 1.25rem !important; background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(part5Color, 0.12)} !important; text-align: center !important;">
              <h5 class="font-bold mb-2" style="font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 0.5rem !important;">${item.title}</h5>
              <p class="text-xs text-zinc-500" style="font-size: 0.75rem !important; color: ${darkCardTextColors.tertiary} !important;">${item.description}</p>
            </div>
            `,
              )
              .join('')}
          </div>
        </section>

        <!-- 5.4 비상 대책 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">⚠️</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                5.4 비상 대책
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Emergency Protocol</p>
            </div>
          </div>
          
          <div class="bg-red-600/5 border border-red-600/20 p-6 rounded-2xl flex items-center justify-between" style="background-color: ${hexToRgba(tertiaryColor, 0.15)} !important; border: 1px solid ${hexToRgba(part5Color, 0.12)} !important; padding: 1.5rem !important; border-radius: 1rem !important; display: flex !important; align-items: center !important; justify-content: space-between !important; width: 100% !important;">
            <div class="w-2/3" style="width: 66.666667% !important;">
              <p class="text-base font-bold text-white mb-2" style="font-size: 1rem !important; font-weight: bold !important; color: ${textColors.primary} !important; margin-bottom: 0.5rem !important;">${emergency.title}</p>
              <p class="text-xs text-zinc-500" style="font-size: 0.75rem !important; color: ${cardTextColors.tertiary} !important;">${emergency.description}</p>
            </div>
            <div class="px-6 py-2.5 bg-red-600 rounded-xl text-xs font-black text-white italic tracking-widest uppercase" style="padding-left: 1.5rem !important; padding-right: 1.5rem !important; padding-top: 0.625rem !important; padding-bottom: 0.625rem !important; background-color: ${primaryColor} !important; border-radius: 0.75rem !important; font-size: 0.75rem !important; font-weight: 900 !important; color: ${textColors.primary} !important; font-style: italic !important; letter-spacing: 0.1em !important; text-transform: uppercase !important;">
              ${emergency.badge}
            </div>
          </div>
        </section>
      </div>
      ${generatePageFooter('08', primaryColor, textColors)}
    </div>
  `;
}
