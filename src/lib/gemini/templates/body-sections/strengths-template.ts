/* 제안사의 특징 및 장점 템플릿 (고정 템플릿) */
import { hexToRgba, getA4PageContainerStyle, generatePageFooter } from '../constants';

interface TextColors {
  primary: string;
  secondary: string;
  tertiary: string;
}

/**
 * 제안사의 특징 및 장점 페이지 HTML 생성
 * @param primaryColor - 브랜드 컬러 1
 * @param secondaryColor - 브랜드 컬러 2
 * @param tertiaryColor - 브랜드 컬러 3
 * @param textColors - 텍스트 색상 객체
 * @returns 제안사의 특징 및 장점 페이지 HTML
 */
export function generateStrengthsTemplate(
  primaryColor: string,
  secondaryColor: string,
  tertiaryColor: string,
  textColors: TextColors,
): string {
  const strengths = [
    {
      id: '01',
      title: '자체 서비스 출시를 통한 비즈니스 고도화 경험',
      desc: '단순 개발을 넘어 포스투, 플러그, 뉴턴 등 자체 SaaS 및 플랫폼을 직접 출시하고 유료 운영하며 겪은 비즈니스 로직과 운영 노하우를 클라이언트의 프로덕트에 투영합니다.',
      tags: ['Pluuug', 'Posttoo', 'Newton'],
      icon: '🚀',
    },
    {
      id: '02',
      title: '프로덕션과 마케팅의 유기적인 시너지 노하우',
      desc: "브랜딩/프로덕션 전문 '똑똑한개발자'와 마케팅 컨설팅 전문 '하우어바웃'의 협업 모델을 통해, 개발 완료가 끝이 아닌 시장 안착과 성장을 위한 통합 솔루션을 제공합니다.",
      tags: ['Design System', 'Marketing Logic'],
      icon: '⚡',
    },
    {
      id: '03',
      title: '성공적인 운영을 위한 경영 컨설팅 무료 지원',
      desc: '벤처 확인, 이노비즈, 메인비즈 등 기업 인증 획득 서포트부터 정책 자금 조달 및 정부 지원 사업(예창패, 초창패 등) 큐레이션까지 경영 관점의 비즈니스 서포트를 진행합니다.',
      tags: ['Gov. Support', 'Policy Funds'],
      icon: '🛡️',
    },
    {
      id: '04',
      title: '개발팀 구축 대행 및 전문 온보딩 교육 진행',
      desc: "서비스 운영을 위한 내부 개발자 채용의 어려움을 해결하기 위해 '커리어스쿼드'를 통한 채용 연계와 자체 온보딩 프로그램을 통한 실무 교육 및 인수인계를 완벽히 지원합니다.",
      tags: ['Career Squad', 'Developer Onboarding'],
      icon: '👥',
    },
  ];

  return `
    <div class="a4-page body-section flex flex-col" style="${getA4PageContainerStyle(tertiaryColor, textColors.primary)}; page-break-after: always !important;">
      <!-- Main Title Section -->
      <div class="mb-4" style="margin-bottom: 1rem !important;">
        <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
          <div style="height: 2px !important; width: 3rem !important; background-color: ${primaryColor} !important;"></div>
          <span style="font-size: 0.6875rem !important; font-weight: 900 !important; letter-spacing: 0.4em !important; color: ${primaryColor} !important; text-transform: uppercase !important;">Our Core Strengths</span>
        </div>
        <h2 style="font-size: 2rem !important; font-weight: 900 !important; line-height: 1.1 !important; letter-spacing: -0.02em !important; margin-bottom: 0.75rem !important; color: ${textColors.primary} !important;">
          왜 <span style="color: ${primaryColor} !important; font-style: italic !important;">똑똑한개발자</span>를 <br />
          선택할 수밖에 없는가?
        </h2>
        <p style="color: ${textColors.tertiary} !important; font-weight: 500 !important; font-size: 0.75rem !important; max-width: 32rem !important; word-break: keep-all !important; margin-bottom: 0 !important;">
          단순히 코드를 짜는 에이전시를 넘어, 비즈니스의 시작부터 성장, 그리고 조직 구성까지 
          함께 고민하는 비즈니스 파트너로서의 4가지 확실한 경쟁력을 제안합니다.
        </p>
      </div>

      <!-- Strengths Grid -->
      <div class="grid grid-cols-2 gap-3 flex-1 mb-4" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 0.75rem !important; flex: 1 !important; margin-bottom: 1rem !important;">
        ${strengths
          .map(
            s => `
        <div style="padding: 1.25rem !important; background-color: ${hexToRgba(secondaryColor, 0.2)} !important; border-radius: 1.5rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; display: flex !important; flex-direction: column !important; height: auto !important; box-shadow: 0 1px 2px 0 ${hexToRgba(tertiaryColor, 0.1)} !important;">
          <div class="flex justify-between items-start mb-3" style="display: flex !important; justify-content: space-between !important; align-items: flex-start !important; margin-bottom: 0.75rem !important;">
            <div style="width: 2.25rem !important; height: 2.25rem !important; background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border-radius: 1.125rem !important; display: flex !important; align-items: center !important; justify-content: center !important; box-shadow: 0 1px 2px 0 ${hexToRgba(tertiaryColor, 0.1)} !important;">
              <span style="font-size: 1.125rem !important;">${s.icon}</span>
            </div>
            <span style="font-size: 1.625rem !important; font-weight: 900 !important; color: ${hexToRgba(primaryColor, 0.2)} !important; font-style: italic !important;">${s.id}</span>
          </div>
          <h4 style="font-size: 0.9375rem !important; font-weight: 900 !important; color: ${textColors.primary} !important; margin-bottom: 0.5rem !important; letter-spacing: -0.01em !important; word-break: keep-all !important; line-height: 1.2 !important;">${s.title}</h4>
          <p style="font-size: 0.625rem !important; color: ${textColors.tertiary} !important; line-height: 1.35 !important; font-weight: 500 !important; margin-bottom: 0.75rem !important; word-break: keep-all !important;">${s.desc}</p>
          <div class="flex flex-wrap gap-2" style="display: flex !important; flex-wrap: wrap !important; gap: 0.375rem !important;">
            ${s.tags
              .map(
                tag => `
            <span style="padding: 0.1875rem 0.5rem !important; background-color: ${hexToRgba(tertiaryColor, 0.2)} !important; color: ${textColors.secondary} !important; font-size: 0.5rem !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; border-radius: 0.375rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.15)} !important;">${tag}</span>
            `,
              )
              .join('')}
          </div>
        </div>
        `,
          )
          .join('')}
      </div>

      <!-- Bottom Partnership Summary -->
      <div style="background-color: ${tertiaryColor} !important; border-radius: 1.5rem !important; padding: 1.25rem !important; color: ${textColors.primary} !important; position: relative !important; overflow: hidden !important;">
        <div style="position: absolute !important; top: -20% !important; right: -10% !important; width: 12rem !important; height: 12rem !important; background-color: ${hexToRgba(primaryColor, 0.2)} !important; border-radius: 50% !important; filter: blur(60px) !important;"></div>
        <div style="position: relative !important; z-index: 10 !important; display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 1.25rem !important;">
          <div style="max-width: 28rem !important; flex: 1 !important;">
            <h3 style="font-size: 1rem !important; font-weight: 900 !important; margin-bottom: 0.375rem !important; letter-spacing: -0.01em !important; color: ${textColors.primary} !important;">비즈니스 전반을 아우르는 최고의 파트너</h3>
            <p style="font-size: 0.625rem !important; color: ${hexToRgba(textColors.tertiary, 0.7)} !important; line-height: 1.35 !important; font-weight: 500 !important; margin: 0 !important;">
              IT 서비스 기획 컨설팅부터 프로덕트 개발, 마케팅, 그리고 채용 연계까지 내재화된 인력으로 진행 가능해, 
              단순한 아웃소싱이 아닌 성공을 함께 만드는 비즈니스 파트너로서 함께 합니다.
            </p>
          </div>
          <div style="display: flex !important; gap: 0.625rem !important; flex-shrink: 0 !important;">
            ${[
              { label: '경영 컨설팅', icon: '📊' },
              { label: '프로덕트 개발', icon: '📈' },
              { label: '마케팅 시너지', icon: '⚡' },
            ]
              .map(
                item => `
            <div style="display: flex !important; flex-direction: column !important; align-items: center !important; gap: 0.375rem !important;">
              <div style="width: 1.75rem !important; height: 1.75rem !important; background-color: ${hexToRgba(textColors.primary, 0.1)} !important; border-radius: 0.375rem !important; display: flex !important; align-items: center !important; justify-content: center !important; color: ${primaryColor} !important;">
                <span style="font-size: 0.6875rem !important;">${item.icon}</span>
              </div>
              <span style="font-size: 0.4375rem !important; font-weight: bold !important; color: ${hexToRgba(textColors.primary, 0.6)} !important; white-space: nowrap !important;">${item.label}</span>
            </div>
            `,
              )
              .join('')}
          </div>
        </div>
      </div>
      ${generatePageFooter('09', primaryColor, textColors)}
    </div>
  `;
}
