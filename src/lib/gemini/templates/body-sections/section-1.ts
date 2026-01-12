/* 본문 섹션 1: 제안 개요 (Part I: Introduction)*/
import type { BodySection1Data } from '../types';
import {
  getContrastTextColorWithGray,
  getCardTextColor,
  hexToRgba,
  getA4PageContainerStyle,
  getBrandColors,
  generateSectionHeader,
  generatePageFooter,
} from '../constants';
import { generateCompanyIntroductionTemplate } from './company-introduction-template';
import { generateStrengthsTemplate } from './strengths-template';

export function generateBodySection1Template(
  data: BodySection1Data,
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

  // 미팅 전사록 기반으로 Gemini가 생성한 데이터 사용 (기본값 없음)
  const background = data.background || {
    quote: '',
    marketBackground: '',
    primaryGoal: '',
  };

  // scope 데이터 처리 (string[] 또는 Array<{title, description}>)
  const scopeItems =
    !data.scope || data.scope.length === 0
      ? []
      : typeof data.scope[0] === 'string'
        ? (data.scope as string[]).map(item => ({ title: item, description: '' }))
        : (data.scope as Array<{ title: string; description: string }>);

  const strengths = data.strengths || [];

  // 카드 배경색에 따른 텍스트 색상 계산
  const largeCardTextColors = getCardTextColor(secondaryColor, tertiaryColor, 0.4);
  const smallCardTextColors = getCardTextColor(tertiaryColor, tertiaryColor, 0.3);
  const scopeCardTextColors = getCardTextColor(secondaryColor, tertiaryColor, 0.4);

  return `
    ${generateCompanyIntroductionTemplate(primaryColor, secondaryColor, tertiaryColor, textColors)}
    ${generateStrengthsTemplate(primaryColor, secondaryColor, tertiaryColor, textColors)}
    <div class="a4-page body-section flex flex-col" style="${getA4PageContainerStyle(tertiaryColor, textColors.primary)}">
      ${generateSectionHeader(
        'I',
        '제안 개요',
        'Project Overview',
        '본 사업의 배경, 목적 및 수행 범위를 명확히 정의합니다.',
        primaryColor,
        textColors,
      )}

      <div class="flex-1 space-y-6" style="flex: 1 !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">

        <!-- 1.2 제안 배경 및 목적 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">🎯</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                1.2 제안 배경 및 목적
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Context & Objectives</p>
            </div>
          </div>
          
          <div class="bg-zinc-900/30 border border-white/5 p-6 rounded-2xl grid grid-cols-12 gap-6 items-center" style="background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; padding: 1.5rem !important; border-radius: 1rem !important; display: grid !important; grid-template-columns: repeat(12, minmax(0, 1fr)) !important; gap: 1.5rem !important; align-items: center !important;">
            <div class="col-span-8" style="grid-column: span 8 / span 8 !important;">
              <p class="text-zinc-400 leading-relaxed mb-4 font-light italic border-l-2 pl-4 text-sm" style="color: ${largeCardTextColors.tertiary} !important; line-height: 1.5 !important; margin-bottom: 1rem !important; font-weight: 300 !important; font-style: italic !important; border-left: 2px solid ${primaryColor} !important; padding-left: 1rem !important; font-size: 0.875rem !important;">
                "${background.quote}"
              </p>
              <div class="grid grid-cols-2 gap-3" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.75rem !important;">
                <div class="bg-zinc-950 p-4 rounded-xl border border-white/5" style="background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; padding: 1rem !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important;">
                  <p class="text-xs font-bold mb-1.5 uppercase tracking-tighter" style="font-size: 0.75rem !important; font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 0.375rem !important; text-transform: uppercase !important; letter-spacing: -0.025em !important;">Market Background</p>
                  <p class="text-xs text-zinc-300 leading-relaxed" style="font-size: 0.75rem !important; color: ${smallCardTextColors.secondary} !important; line-height: 1.5 !important;">${background.marketBackground}</p>
                </div>
                <div class="bg-zinc-950 p-4 rounded-xl border border-white/5" style="background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; padding: 1rem !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important;">
                  <p class="text-xs font-bold mb-1.5 uppercase tracking-tighter" style="font-size: 0.75rem !important; font-weight: bold !important; color: ${primaryColor} !important; margin-bottom: 0.375rem !important; text-transform: uppercase !important; letter-spacing: -0.025em !important;">Primary Goal</p>
                  <p class="text-xs text-zinc-300 leading-relaxed" style="font-size: 0.75rem !important; color: ${smallCardTextColors.secondary} !important; line-height: 1.5 !important;">${background.primaryGoal}</p>
                </div>
              </div>
            </div>
            <div class="col-span-4 flex justify-center opacity-10" style="grid-column: span 4 / span 4 !important; display: flex !important; justify-content: center !important; opacity: 0.1 !important;">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
          </div>
        </section>

        <!-- 1.3 제안의 범위 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">📦</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                1.3 제안의 범위
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Project Scope</p>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-3" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 0.75rem !important; width: 100% !important;">
            ${scopeItems
              .slice(0, 3)
              .map(
                item => `
            <div class="p-4 bg-zinc-900/40 border border-white/5 rounded-xl" style="padding: 1rem !important; background-color: ${hexToRgba(secondaryColor, 0.4)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; border-radius: 0.75rem !important; width: 100% !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; gap: 0.5rem !important;">
              <div class="w-10 h-10 bg-zinc-950 rounded-lg flex items-center justify-center border border-white/5" style="width: 2.5rem !important; height: 2.5rem !important; background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <p class="text-xs font-bold text-zinc-200" style="font-size: 0.75rem !important; font-weight: bold !important; color: ${scopeCardTextColors.primary} !important; margin: 0 !important;">${item.title}</p>
              ${item.description ? `<p class="text-[11px] text-zinc-400 leading-tight" style="font-size: 0.6875rem !important; color: ${scopeCardTextColors.tertiary} !important; line-height: 1.4 !important; margin: 0 !important;">${item.description}</p>` : ''}
            </div>
            `,
              )
              .join('')}
          </div>
        </section>

        <!-- 1.4 제안사의 특징 및 장점 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">⚡</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                1.4 제안사의 특징 및 장점
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Key Strengths</p>
            </div>
          </div>
          
          <div class="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 p-6 rounded-2xl" style="background: linear-gradient(to bottom right, ${hexToRgba(primaryColor, 0.15)}, ${hexToRgba(tertiaryColor, 0.1)}) !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; padding: 1.5rem !important; border-radius: 1rem !important; width: 100% !important; box-sizing: border-box !important;">
            <div class="grid grid-cols-3 gap-6" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 1.5rem !important; width: 100% !important;">
              ${strengths
                .slice(0, 3)
                .map(
                  (item, i) => `
              <div>
                <p class="text-3xl font-black italic mb-1.5" style="font-size: 1.875rem !important; font-weight: 900 !important; font-style: italic !important; color: ${primaryColor} !important; margin-bottom: 0.375rem !important;">0${i + 1}</p>
                <p class="text-sm font-bold text-zinc-100 mb-1.5" style="font-size: 0.875rem !important; font-weight: bold !important; color: ${textColors.primary} !important; margin-bottom: 0.375rem !important;">${item.title}</p>
                <p class="text-[11px] text-zinc-500 leading-tight whitespace-pre-line" style="font-size: 11px !important; color: ${textColors.tertiary} !important; line-height: 1.4 !important; white-space: pre-line !important;">${item.description}</p>
              </div>
              `,
                )
                .join('')}
            </div>
          </div>
        </section>
      </div>
      ${generatePageFooter('03', primaryColor, textColors)}
    </div>
  `;
}
