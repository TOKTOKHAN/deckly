/*본문 섹션 3: 기술 및 기능 부문 (Part III: Technical Solution)*/
import type { BodySection3Data } from '../types';

export function generateBodySection3Template(data: BodySection3Data, brandColor1?: string): string {
  const primaryColor = brandColor1 || '#4f46e5';
  const blueColor = '#3b82f6'; // blue-500

  // 기본값 설정
  const architecture = data.architecture || {
    frontend: ['Mobile App', 'Web Platform'],
    coreHub: 'CORE HUB',
    backend: ['Microservices', 'Scalable DB'],
  };

  const features = data.features || [
    '반응형 웹 및 하이브리드 앱 고도화',
    'AI 기반 스마트 주문 시스템 연동',
    '실시간 배달 트래킹 GPS 인터페이스',
  ];

  const security = data.security || ['End-to-End 데이터 암호화', 'WAF 및 DDoS 방어 체계 구축'];

  const integrations = data.integrations || ['POS SYSTEM', 'CRM', 'ERP', '3RD PARTY API'];

  return `
    <div class="a4-page flex flex-col" style="background-color: #0a0c10 !important; color: white !important; position: relative !important; overflow: visible !important; width: 210mm !important; min-height: 297mm !important; height: auto !important; padding: 2rem !important; margin: 0 !important; max-width: 210mm !important;">
      
      <!-- Main Title -->
      <div class="mb-6" style="margin-bottom: 1.5rem !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${primaryColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${primaryColor} !important; text-transform: uppercase !important;">Part III</span>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: white !important; margin-bottom: 0.5rem !important;">
          기술 및 기능 부문
          <span class="block text-sm font-light italic tracking-widest uppercase mt-1" style="display: block !important; font-size: 0.875rem !important; font-weight: 300 !important; font-style: italic !important; letter-spacing: 0.1em !important; color: #71717a !important; text-transform: uppercase !important; margin-top: 0.25rem !important;">Technical Solution</span>
        </h1>
        <p class="text-sm text-zinc-400 mt-2" style="font-size: 0.875rem !important; color: #a1a1aa !important; margin-top: 0.5rem !important;">
          안정적이고 유연한 시스템 구축을 위한 핵심 기술 아키텍처를 제시합니다.
        </p>
      </div>

      <div class="flex-1 space-y-6" style="flex: 1 !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
        
        <!-- 3.1 시스템 목표 아키텍처 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">📚</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                3.1 시스템 목표 아키텍처
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Cloud-Native Structure</p>
            </div>
          </div>
          
          <div class="bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl p-8 flex justify-center" style="background-color: rgba(24, 24, 27, 0.2) !important; border: 1px dashed #27272a !important; border-radius: 1rem !important; padding: 2rem !important; display: flex !important; justify-content: center !important; width: 100% !important;">
            <div class="flex items-center gap-6" style="display: flex !important; align-items: center !important; gap: 1.5rem !important;">
              <div class="flex flex-col gap-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important;">
                ${
                  architecture.frontend
                    ?.slice(0, 2)
                    .map(
                      (item, i) => `
                <div class="w-16 h-16 bg-zinc-800 rounded-xl border border-white/10 flex items-center justify-center" style="width: 4rem !important; height: 4rem !important; background-color: #27272a !important; border-radius: 0.75rem !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; display: flex !important; align-items: center !important; justify-content: center !important; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1) !important;">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${i === 0 ? blueColor : '#71717a'} !important;">
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
              <div class="w-36 h-36 rounded-full border-4 border-blue-600/10 flex items-center justify-center relative" style="width: 9rem !important; height: 9rem !important; border-radius: 9999px !important; border: 4px solid rgba(37, 99, 235, 0.1) !important; display: flex !important; align-items: center !important; justify-content: center !important; position: relative !important;">
                <div class="w-28 h-28 bg-zinc-950 border-2 border-blue-600 rounded-2xl flex flex-col items-center justify-center gap-2" style="width: 7rem !important; height: 7rem !important; background-color: #09090b !important; border: 2px solid ${blueColor} !important; border-radius: 1rem !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 0.5rem !important; box-shadow: 0 0 40px rgba(37, 99, 235, 0.2) !important;">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${blueColor} !important;">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                  <span class="text-[9px] font-black text-white italic tracking-[0.2em]" style="font-size: 9px !important; font-weight: 900 !important; color: white !important; font-style: italic !important; letter-spacing: 0.2em !important;">${architecture.coreHub}</span>
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
                <div class="w-32 p-3 bg-zinc-900 rounded-xl border border-white/5 text-center text-xs font-bold text-zinc-400" style="width: 8rem !important; padding: 0.75rem !important; background-color: #18181b !important; border-radius: 0.75rem !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; text-align: center !important; font-size: 0.75rem !important; font-weight: bold !important; color: #a1a1aa !important;">${item}</div>
                `,
                    )
                    .join('') || ''
                }
              </div>
            </div>
          </div>
        </section>

        <!-- 3.2 기능 구현 방안 & 3.3 보안 및 데이터 관리 -->
        <section class="grid grid-cols-2 gap-6" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1.5rem !important; width: 100% !important;">
          <!-- 3.2 기능 구현 방안 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
                <span style="font-size: 1.25rem !important;">💻</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                  3.2 기능 구현 방안
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Functional Implementation</p>
              </div>
            </div>
            <ul class="space-y-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important; list-style: none !important; padding: 0 !important; margin: 0 !important;">
              ${
                features
                  ?.slice(0, 3)
                  .map(
                    feature => `
              <li class="flex items-start gap-3 p-3 bg-zinc-900/20 border border-white/5 rounded-xl" style="display: flex !important; align-items: flex-start !important; gap: 0.75rem !important; padding: 0.75rem !important; background-color: rgba(24, 24, 27, 0.2) !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 0.75rem !important;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${blueColor} !important; margin-top: 0.125rem !important; flex-shrink: 0 !important;">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span class="text-xs font-medium text-zinc-400" style="font-size: 0.75rem !important; font-weight: 500 !important; color: #a1a1aa !important;">${feature}</span>
              </li>
              `,
                  )
                  .join('') || ''
              }
            </ul>
          </div>
          
          <!-- 3.3 보안 및 데이터 관리 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
                <span style="font-size: 1.25rem !important;">🛡️</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                  3.3 보안 및 데이터 관리
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Security Framework</p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-3" style="display: flex !important; flex-direction: column !important; gap: 0.75rem !important; width: 100% !important;">
              ${
                security
                  ?.slice(0, 2)
                  .map(
                    item => `
              <div class="p-4 bg-zinc-950 border border-white/5 rounded-xl flex items-center gap-3" style="padding: 1rem !important; background-color: #09090b !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 0.75rem !important; display: flex !important; align-items: center !important; gap: 0.75rem !important;">
                <div class="w-2 h-2 rounded-full bg-blue-500" style="width: 0.5rem !important; height: 0.5rem !important; border-radius: 9999px !important; background-color: ${blueColor} !important;"></div>
                <span class="text-xs text-zinc-300 font-bold" style="font-size: 0.75rem !important; color: #d4d4d8 !important; font-weight: bold !important;">${item}</span>
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
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(59, 130, 246, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">⚙️</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                3.4 시스템 연계 방안
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Internal & External Integration</p>
            </div>
          </div>
          
          <div class="bg-zinc-900/30 p-6 rounded-2xl flex justify-around items-center border border-white/5 italic text-zinc-500 font-black text-xs tracking-widest" style="background-color: rgba(24, 24, 27, 0.3) !important; padding: 1.5rem !important; border-radius: 1rem !important; display: flex !important; justify-content: space-around !important; align-items: center !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; font-style: italic !important; color: #71717a !important; font-weight: 900 !important; font-size: 0.75rem !important; letter-spacing: 0.1em !important; width: 100% !important;">
            ${integrations
              .map(
                (item, i) => `
            ${i > 0 ? '<div class="w-1 h-1 bg-zinc-800 rounded-full" style="width: 0.25rem !important; height: 0.25rem !important; background-color: #27272a !important; border-radius: 9999px !important;"></div>' : ''}
            <span>${item}</span>
            `,
              )
              .join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}
