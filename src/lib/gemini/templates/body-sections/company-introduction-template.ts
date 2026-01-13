/* 제안사 소개 템플릿 (고정 템플릿) */
import { hexToRgba, getA4PageContainerStyle, generatePageFooter } from '../constants';

interface TextColors {
  primary: string;
  secondary: string;
  tertiary: string;
}

/**
 * 제안사 소개 페이지 HTML 생성
 * @param primaryColor - 브랜드 컬러 1
 * @param secondaryColor - 브랜드 컬러 2
 * @param tertiaryColor - 브랜드 컬러 3
 * @param textColors - 텍스트 색상 객체
 * @returns 제안사 소개 페이지 HTML
 */
export function generateCompanyIntroductionTemplate(
  primaryColor: string,
  secondaryColor: string,
  tertiaryColor: string,
  textColors: TextColors,
): string {
  const services = [
    {
      title: 'UXUI, 브랜드 컨설팅',
      desc: '사용자 경험 기반의 인터페이스와 브랜드 이미지 및 가이드라인 구축',
      keywords: ['UXUI', 'Branding', '2D-3D Graphic'],
      icon: '🖥️',
    },
    {
      title: 'WEB / APP 개발',
      desc: 'MVP, 프로덕션, 인터랙티브 웹 등 플랫폼 구축 및 기능 고도화',
      keywords: ['MVP', 'Production', 'React', 'Django'],
      icon: '💻',
    },
    {
      title: '마케팅 / 유저 분석 툴 연동',
      desc: '유저 데이터 분석 및 마케팅 방향성 설정을 돕는 세팅 제공',
      keywords: ['Hotjar', 'Google Analytics', 'Naver'],
      icon: '📊',
    },
    {
      title: 'SEO 최적화',
      desc: '네이버, 구글 서치콘솔 등을 활용한 검색 최적화 고려 개발',
      keywords: ['Technical SEO', 'Naver Search Advisor', 'GSC'],
      icon: '🌐',
    },
  ];

  return `
    <div class="a4-page body-section flex flex-col" style="${getA4PageContainerStyle(tertiaryColor, textColors.primary)}; page-break-after: always !important;">
      <!-- 1.1 제안사 소개 -->
      <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
        <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
            <span style="font-size: 1.25rem !important;">🏢</span>
          </div>
          <div>
            <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
              1.1 제안사 소개
            </h2>
            <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Company Introduction</p>
          </div>
        </div>
      </section>

      <!-- Main Identity Section -->
      <div class="mb-6 relative" style="margin-bottom: 1.5rem !important; position: relative !important;">
        <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
          <div style="height: 2px !important; width: 3rem !important; background-color: ${primaryColor} !important;"></div>
          <span style="font-size: 0.6875rem !important; font-weight: 900 !important; letter-spacing: 0.4em !important; color: ${primaryColor} !important; text-transform: uppercase !important;">Core Vision</span>
        </div>
        <h2 style="font-size: 2.25rem !important; font-weight: 900 !important; line-height: 1.1 !important; letter-spacing: -0.02em !important; margin-bottom: 1rem !important; color: ${textColors.primary} !important;">
          IT 프로덕트의 <br />
          가장 <span style="color: ${primaryColor} !important; font-style: italic !important;">똑똑한 경험</span>, <br />
          똑똑한개발자
        </h2>
        <div style="max-width: 42rem !important; border-left: 2px solid ${hexToRgba(tertiaryColor, 0.2)} !important; padding-left: 1.25rem !important;">
          <p style="font-size: 0.875rem !important; color: ${textColors.secondary} !important; font-weight: 500 !important; line-height: 1.45 !important; word-break: keep-all !important; margin: 0 !important;">
            똑똑한개발자는 IT 프로덕트 에이전시입니다. <br />
            서비스의 이야기와 지닌 가치가 울림으로 다가갈 수 있도록 일상적인 시각 언어에 머무르지 않고, 
            <span style="color: ${textColors.primary} !important; font-weight: 900 !important;"> 기술을 통해 탐구하며 다각적인 서비스와 브랜드 경험을 제안합니다.</span>
          </p>
        </div>
      </div>

      <!-- Service Pillars Grid -->
      <div class="flex-1" style="flex: 1 !important;">
        <div class="grid grid-cols-1 gap-3" style="display: grid !important; grid-template-columns: repeat(1, minmax(0, 1fr)) !important; gap: 0.75rem !important;">
          ${services
            .map(
              (s, idx) => `
          <div style="display: flex !important; gap: 1.25rem !important; padding: 1.25rem !important; background-color: ${hexToRgba(secondaryColor, 0.2)} !important; border-radius: 1.5rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important;">
            <div style="width: 2.75rem !important; height: 2.75rem !important; background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border-radius: 1.125rem !important; display: flex !important; align-items: center !important; justify-content: center !important; box-shadow: 0 1px 2px 0 ${hexToRgba(tertiaryColor, 0.1)} !important; flex-shrink: 0 !important;">
              <span style="font-size: 1.125rem !important;">${s.icon}</span>
            </div>
            <div style="flex: 1 !important;">
              <div style="display: flex !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 0.375rem !important;">
                <h4 style="font-size: 1rem !important; font-weight: 900 !important; color: ${textColors.primary} !important; letter-spacing: -0.01em !important;">${s.title}</h4>
                <span style="font-size: 0.5625rem !important; font-weight: 900 !important; color: ${hexToRgba(textColors.tertiary, 0.6)} !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-style: italic !important;">Service 0${idx + 1}</span>
              </div>
              <p style="font-size: 0.75rem !important; color: ${textColors.tertiary} !important; font-weight: 500 !important; line-height: 1.35 !important; margin-bottom: 0.625rem !important; word-break: keep-all !important;">${s.desc}</p>
              <div style="display: flex !important; flex-wrap: wrap !important; gap: 0.375rem !important;">
                ${s.keywords
                  .map(
                    kw => `
                <span style="padding: 0.1875rem 0.5rem !important; background-color: ${hexToRgba(tertiaryColor, 0.2)} !important; color: ${textColors.secondary} !important; font-size: 0.5rem !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; border-radius: 0.375rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.15)} !important;">${kw}</span>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </div>
          `,
            )
            .join('')}
        </div>
      </div>
      </section>
      ${generatePageFooter('03', primaryColor, textColors)}
    </div>
  `;
}
