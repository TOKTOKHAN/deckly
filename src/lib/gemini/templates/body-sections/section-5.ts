/* 본문 섹션 5: 사업 지원 부문 (Part V: Sustainability & Support) */
import type { BodySection5Data } from '../types';

export function generateBodySection5Template(data: BodySection5Data, brandColor1?: string): string {
  const primaryColor = brandColor1 || '#4f46e5';
  const blueColor = '#3b82f6'; // blue-500
  const redColor = '#ef4444'; // red-500

  // 기본값 설정
  const training = data.training || [
    '관리자 기능 매뉴얼 및 가이드 배포',
    '현업 담당자 대상 시스템 활용 교육(2회)',
    '데이터 분석 및 마케팅 툴 활용 워크숍',
  ];

  const knowledgeTransfer =
    data.knowledgeTransfer ||
    '"모든 소스코드 및 인프라 설계 문서를 제공하며, 자체 운영 역량 내재화를 적극 지원합니다."';

  const maintenance = data.maintenance || [
    { title: '24/7 Monitoring', description: '상시 모니터링 체계 가동' },
    { title: 'Regular Updates', description: '보안 취약점 점검 및 패치' },
    { title: 'Help Desk', description: '전담 기술 지원 헬프데스크' },
  ];

  const emergency = data.emergency || {
    title: '장애 발생 시 30분 내 초동 조치 보장',
    description: '에스컬레이션 경로 수립을 통한 무중단 비즈니스 연속성 확보',
    badge: 'DR System Active',
  };

  return `
    <div class="a4-page flex flex-col" style="background-color: #0a0c10 !important; color: white !important; position: relative !important; overflow: visible !important; width: 210mm !important; min-height: 297mm !important; height: auto !important; padding: 2rem !important; margin: 0 !important; max-width: 210mm !important;">
      
      <!-- Main Title -->
      <div class="mb-6" style="margin-bottom: 1.5rem !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${primaryColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${primaryColor} !important; text-transform: uppercase !important;">Part V</span>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: white !important; margin-bottom: 0.5rem !important;">
          사업 지원 부문
          <span class="block text-sm font-light italic tracking-widest uppercase mt-1" style="display: block !important; font-size: 0.875rem !important; font-weight: 300 !important; font-style: italic !important; letter-spacing: 0.1em !important; color: #71717a !important; text-transform: uppercase !important; margin-top: 0.25rem !important;">Sustainability & Support</span>
        </h1>
        <p class="text-sm text-zinc-400 mt-2" style="font-size: 0.875rem !important; color: #a1a1aa !important; margin-top: 0.5rem !important;">
          사업 완료 이후의 안정적인 운영 지원 및 기술 전수 계획을 제안합니다.
        </p>
      </div>

      <div class="flex-1 space-y-6" style="flex: 1 !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
        
        <!-- 5.1 교육 훈련 계획 & 5.2 기술 이전 계획 -->
        <section class="grid grid-cols-2 gap-6" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1.5rem !important; width: 100% !important;">
          <!-- 5.1 교육 훈련 계획 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
                <span style="font-size: 1.25rem !important;">📖</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                  5.1 교육 훈련 계획
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Operation Training</p>
              </div>
            </div>
            <div class="bg-zinc-900/40 p-6 rounded-2xl" style="background-color: rgba(24, 24, 27, 0.4) !important; padding: 1.5rem !important; border-radius: 1rem !important; width: 100% !important;">
              <ul class="space-y-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important; list-style: none !important; padding: 0 !important; margin: 0 !important;">
                ${
                  training
                    ?.slice(0, 3)
                    .map(
                      item => `
                <li class="flex gap-3 text-sm text-zinc-400" style="display: flex !important; gap: 0.75rem !important; font-size: 0.875rem !important; color: #a1a1aa !important;">
                  <div class="w-1 h-1 bg-blue-500 rounded-full mt-2 shrink-0" style="width: 0.25rem !important; height: 0.25rem !important; background-color: ${blueColor} !important; border-radius: 9999px !important; margin-top: 0.5rem !important; flex-shrink: 0 !important;"></div>
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
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
                <span style="font-size: 1.25rem !important;">👥</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                  5.2 기술 이전 계획
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Knowledge Transfer</p>
              </div>
            </div>
            <div class="bg-zinc-900/40 p-6 rounded-2xl h-full flex flex-col justify-center" style="background-color: rgba(24, 24, 27, 0.4) !important; padding: 1.5rem !important; border-radius: 1rem !important; height: 100% !important; display: flex !important; flex-direction: column !important; justify-content: center !important; width: 100% !important;">
              <p class="text-sm text-zinc-400 leading-relaxed font-light italic border-l-2 border-zinc-700 pl-4" style="font-size: 0.875rem !important; color: #a1a1aa !important; line-height: 1.5 !important; font-weight: 300 !important; font-style: italic !important; border-left: 2px solid #3f3f46 !important; padding-left: 1rem !important;">${knowledgeTransfer}</p>
            </div>
          </div>
        </section>

        <!-- 5.3 유지보수 및 운영 지원 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">⚙️</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
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
            <div class="p-5 bg-zinc-950 rounded-xl border border-white/5 text-center" style="padding: 1.25rem !important; background-color: #09090b !important; border-radius: 0.75rem !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; text-align: center !important;">
              <h5 class="font-bold mb-2" style="font-weight: bold !important; color: ${blueColor} !important; margin-bottom: 0.5rem !important;">${item.title}</h5>
              <p class="text-xs text-zinc-500" style="font-size: 0.75rem !important; color: #71717a !important;">${item.description}</p>
            </div>
            `,
              )
              .join('')}
          </div>
        </section>

        <!-- 5.4 비상 대책 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(239, 68, 68, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">⚠️</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                5.4 비상 대책
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Emergency Protocol</p>
            </div>
          </div>
          
          <div class="bg-red-600/5 border border-red-600/20 p-6 rounded-2xl flex items-center justify-between" style="background-color: rgba(220, 38, 38, 0.05) !important; border: 1px solid rgba(220, 38, 38, 0.2) !important; padding: 1.5rem !important; border-radius: 1rem !important; display: flex !important; align-items: center !important; justify-content: space-between !important; width: 100% !important;">
            <div class="w-2/3" style="width: 66.666667% !important;">
              <p class="text-base font-bold text-white mb-2" style="font-size: 1rem !important; font-weight: bold !important; color: white !important; margin-bottom: 0.5rem !important;">${emergency.title}</p>
              <p class="text-xs text-zinc-500" style="font-size: 0.75rem !important; color: #71717a !important;">${emergency.description}</p>
            </div>
            <div class="px-6 py-2.5 bg-red-600 rounded-xl text-xs font-black text-white italic tracking-widest uppercase shadow-lg shadow-red-900/40" style="padding-left: 1.5rem !important; padding-right: 1.5rem !important; padding-top: 0.625rem !important; padding-bottom: 0.625rem !important; background-color: ${redColor} !important; border-radius: 0.75rem !important; font-size: 0.75rem !important; font-weight: 900 !important; color: white !important; font-style: italic !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; box-shadow: 0 10px 15px -3px rgba(127, 29, 29, 0.4) !important;">
              ${emergency.badge}
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}
