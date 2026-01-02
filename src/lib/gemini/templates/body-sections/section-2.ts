/* 본문 섹션 2: 제안 전략 (Part II: Strategy)*/
import type { BodySection2Data } from '../types';
import {
  getContrastTextColorWithGray,
  getCardTextColor,
  hexToRgba,
  getA4PageContainerStyle,
} from '../constants';

export function generateBodySection2Template(
  data: BodySection2Data,
  brandColor1?: string,
  brandColor2?: string,
  brandColor3?: string,
): string {
  // 브랜드 컬러 설정
  const primaryColor = brandColor1 || '#4f46e5'; // 주요 강조, 제목, 아이콘
  const secondaryColor = brandColor2 || '#1f2937'; // 카드 배경, 보조 강조
  const tertiaryColor = brandColor3 || '#0a0c10'; // 경계선, 미묘한 배경

  // 배경색 밝기에 따라 텍스트 색상 결정
  const textColors = getContrastTextColorWithGray(tertiaryColor);

  // 카드 배경색에 따른 텍스트 색상 계산
  const cardTextColors = getCardTextColor(secondaryColor, tertiaryColor, 0.4);

  // 미팅 전사록 기반으로 Gemini가 생성한 데이터 사용 (기본값 없음)
  const marketAnalysis = data.marketAnalysis || {
    trends: [],
    coreValue: '',
  };

  const targetModel = data.targetModel || {
    legacy: '',
    target: '',
    nextGen: '',
  };

  const strategies = data.strategies || [];

  const benefits = data.benefits || {
    conversion: '',
    churnRate: '',
  };

  return `
    <div class="a4-page body-section flex flex-col" style="${getA4PageContainerStyle(tertiaryColor, textColors.primary)}">
      
      <!-- Main Title -->
      <div class="mb-6" style="margin-bottom: 1.5rem !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${secondaryColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${secondaryColor} !important; text-transform: uppercase !important;">Part II</span>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: ${textColors.primary} !important; margin-bottom: 0.5rem !important;">
          제안 전략
          <span class="block text-sm font-light italic tracking-widest uppercase mt-1" style="display: block !important; font-size: 0.875rem !important; font-weight: 300 !important; font-style: italic !important; letter-spacing: 0.1em !important; color: #71717a !important; text-transform: uppercase !important; margin-top: 0.25rem !important;">Strategic Approach</span>
        </h1>
        <p class="text-sm text-zinc-400 mt-2" style="font-size: 0.875rem !important; color: #a1a1aa !important; margin-top: 0.5rem !important;">
          시장 트렌드 분석과 데이터 인사이트를 바탕으로 한 추진 전략을 제안합니다.
        </p>
      </div>

      <div class="flex-1 space-y-6" style="flex: 1 !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
        
        <!-- 2.1 사업 이해 및 분석 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">🔍</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                2.1 사업 이해 및 분석
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Market & User Analysis</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1rem !important; width: 100% !important;">
            <div class="bg-zinc-900/40 p-6 rounded-2xl border border-white/5" style="background-color: ${hexToRgba(secondaryColor, 0.4)} !important; padding: 1.5rem !important; border-radius: 1rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important;">
              <h5 class="text-xs font-bold mb-3 uppercase tracking-widest" style="font-size: 0.75rem !important; font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 0.75rem !important; text-transform: uppercase !important; letter-spacing: 0.1em !important;">Digital Pizza Trend</h5>
              <div class="space-y-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important;">
                ${
                  marketAnalysis.trends
                    ?.slice(0, 3)
                    .map(
                      trend => `
                <div class="flex items-center justify-between pb-3 border-b border-zinc-800" style="display: flex !important; align-items: center !important; justify-content: space-between !important; padding-bottom: 0.75rem !important; border-bottom: 1px solid #27272a !important;">
                  <span class="text-sm text-zinc-300 font-medium" style="font-size: 0.875rem !important; color: ${cardTextColors.secondary} !important; font-weight: 500 !important;">${trend}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #3f3f46 !important;">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                </div>
                `,
                    )
                    .join('') || ''
                }
              </div>
            </div>
            <div class="bg-red-600/5 p-6 rounded-2xl border border-red-600/10 flex flex-col justify-center text-center" style="background-color: ${hexToRgba(tertiaryColor, 0.15)} !important; padding: 1.5rem !important; border-radius: 1rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; flex-direction: column !important; justify-content: center !important; text-align: center !important;">
              <p class="text-3xl font-black text-white italic mb-1.5 tracking-tighter" style="font-size: 1.875rem !important; font-weight: 900 !important; color: ${textColors.primary} !important; font-style: italic !important; letter-spacing: -0.05em !important; margin-bottom: 0.375rem !important;">"${marketAnalysis.coreValue}"</p>
              <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]" style="font-size: 10px !important; color: #71717a !important; font-weight: bold !important; text-transform: uppercase !important; letter-spacing: 0.2em !important;">Our Core Value</p>
            </div>
          </div>
        </section>

        <!-- 2.2 목표 모델 설계 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">🖥️</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                2.2 목표 모델 설계
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Target Business Model</p>
            </div>
          </div>
          
          <div class="bg-zinc-950 border border-white/5 p-6 rounded-2xl relative overflow-hidden" style="background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; padding: 1.5rem !important; border-radius: 1rem !important; position: relative !important; overflow: hidden !important; width: 100% !important;">
            <div class="flex items-center justify-between relative z-10" style="display: flex !important; align-items: center !important; justify-content: space-between !important; position: relative !important; z-index: 10 !important;">
              <div class="text-center w-32" style="text-align: center !important; width: 8rem !important;">
                <div class="p-4 bg-zinc-900 rounded-xl border border-white/5 text-zinc-500 text-xs font-bold italic" style="padding: 1rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; color: ${cardTextColors.tertiary} !important; font-size: 0.75rem !important; font-weight: bold !important; font-style: italic !important;">${targetModel.legacy}</div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${hexToRgba(tertiaryColor, 0.4)} !important;">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <div class="flex-1 mx-8 p-8 bg-red-600/10 border border-red-600/30 rounded-[30px] text-center" style="flex: 1 !important; margin-left: 2rem !important; margin-right: 2rem !important; padding: 2rem !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.25)} !important; border-radius: 1.875rem !important; text-align: center !important;">
                <p class="text-xl font-black text-white italic tracking-tighter uppercase" style="font-size: 1.25rem !important; font-weight: 900 !important; color: ${textColors.primary} !important; font-style: italic !important; letter-spacing: -0.05em !important; text-transform: uppercase !important;">${targetModel.target}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${hexToRgba(tertiaryColor, 0.4)} !important;">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <div class="text-center w-32" style="text-align: center !important; width: 8rem !important;">
                <div class="p-4 bg-red-600 rounded-xl text-white text-xs font-bold italic" style="padding: 1rem !important; background-color: ${primaryColor} !important; border-radius: 0.75rem !important; color: ${textColors.primary} !important; font-size: 0.75rem !important; font-weight: bold !important; font-style: italic !important;">${targetModel.nextGen}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2.3 추진 전략 & 2.4 기대 효과 -->
        <section class="grid grid-cols-2 gap-6" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1.5rem !important; width: 100% !important;">
          <!-- 2.3 추진 전략 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
                <span style="font-size: 1.25rem !important;">📈</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                  2.3 추진 전략
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Action Strategy</p>
              </div>
            </div>
            <div class="space-y-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important;">
              ${
                strategies
                  ?.slice(0, 3)
                  .map(
                    strategy => `
              <div class="flex items-center gap-3 p-3 bg-zinc-900/30 border border-white/5 rounded-xl" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; padding: 0.75rem !important; background-color: ${hexToRgba(secondaryColor, 0.3)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; border-radius: 0.75rem !important;">
                <div class="w-1.5 h-1.5 rounded-full bg-red-600" style="width: 0.375rem !important; height: 0.375rem !important; border-radius: 9999px !important; background-color: ${primaryColor} !important;"></div>
                <span class="text-xs font-medium text-zinc-300" style="font-size: 0.75rem !important; font-weight: 500 !important; color: ${cardTextColors.secondary} !important;">${strategy}</span>
              </div>
              `,
                  )
                  .join('') || ''
              }
            </div>
          </div>
          
          <!-- 2.4 기대 효과 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
                <span style="font-size: 1.25rem !important;">📊</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                  2.4 기대 효과
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Expected Benefits</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.75rem !important; width: 100% !important;">
              <div class="p-4 bg-zinc-900/50 rounded-xl border border-white/5 text-center" style="padding: 1rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; text-align: center !important;">
                <p class="text-2xl font-black text-white italic" style="font-size: 1.5rem !important; font-weight: 900 !important; color: ${textColors.primary} !important; font-style: italic !important;">${benefits.conversion}</p>
                <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1" style="font-size: 10px !important; color: #71717a !important; font-weight: bold !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; margin-top: 0.25rem !important;">Conversion</p>
              </div>
              <div class="p-4 bg-zinc-900/50 rounded-xl border border-white/5 text-center" style="padding: 1rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; text-align: center !important;">
                <p class="text-2xl font-black text-white italic" style="font-size: 1.5rem !important; font-weight: 900 !important; color: ${textColors.primary} !important; font-style: italic !important;">${benefits.churnRate}</p>
                <p class="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1" style="font-size: 10px !important; color: #71717a !important; font-weight: bold !important; text-transform: uppercase !important; letter-spacing: 0.1em !important; margin-top: 0.25rem !important;">Churn Rate</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}
