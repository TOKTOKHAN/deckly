/*본문 섹션 4: 사업 관리 부문 (Part IV: Project Management)*/
import type { BodySection4Data } from '../types';

export function generateBodySection4Template(data: BodySection4Data, brandColor1?: string): string {
  const primaryColor = brandColor1 || '#4f46e5';
  const redColor = '#ef4444'; // red-500

  // 기본값 설정
  const timeline = data.timeline || [
    { period: 'M1', title: 'Planning & Analysis', description: '요구사항 분석, WBS 확정' },
    { period: 'M2', title: 'UI/UX & Prototype', description: '가이드라인 수립, 메인 디자인' },
    { period: 'M3-M5', title: 'Development', description: '프론트/백엔드 개발, 단위 테스트' },
    { period: 'M6', title: 'Verification & Launch', description: '통합 테스트, QA, 최종 오픈' },
  ];

  const resources = data.resources || [
    { role: 'Project Manager', name: 'Domino Expert' },
    { role: 'Lead Developer', name: 'Domino Expert' },
    { role: 'UX/UI Designer', name: 'Domino Expert' },
    { role: 'QA Engineer', name: 'Domino Expert' },
  ];

  const methodology = data.methodology || {
    title: '"Scrum & Sprint 기반"',
    description: '지속적인 피드백과 점진적 기능 구현으로 변화하는 요구사항에 유연하게 대응합니다.',
  };

  const qualityAssurance = data.qualityAssurance || [
    '정기 단위 테스트',
    '사용자 시나리오 검증',
    '부하 테스트 실시',
  ];

  return `
    <div class="a4-page flex flex-col" style="background-color: #0a0c10 !important; color: white !important; position: relative !important; overflow: visible !important; width: 210mm !important; min-height: 297mm !important; height: auto !important; padding: 2rem !important; margin: 0 !important; max-width: 210mm !important;">
      
      <!-- Main Title -->
      <div class="mb-6" style="margin-bottom: 1.5rem !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${primaryColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${primaryColor} !important; text-transform: uppercase !important;">Part IV</span>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: white !important; margin-bottom: 0.5rem !important;">
          사업 관리 부문
          <span class="block text-sm font-light italic tracking-widest uppercase mt-1" style="display: block !important; font-size: 0.875rem !important; font-weight: 300 !important; font-style: italic !important; letter-spacing: 0.1em !important; color: #71717a !important; text-transform: uppercase !important; margin-top: 0.25rem !important;">Project Management</span>
        </h1>
        <p class="text-sm text-zinc-400 mt-2" style="font-size: 0.875rem !important; color: #a1a1aa !important; margin-top: 0.5rem !important;">
          성공적인 프로젝트 완수를 위한 체계적인 관리 체계와 추진 일정을 제시합니다.
        </p>
      </div>

      <div class="flex-1 space-y-6" style="flex: 1 !important; display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
        
        <!-- 4.1 추진 일정 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(239, 68, 68, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">📊</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                4.1 추진 일정
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Execution Roadmap</p>
            </div>
          </div>
          
          <div class="space-y-2" style="display: flex !important; flex-direction: column !important; gap: 0.5rem !important; width: 100% !important;">
            ${timeline
              .map(
                item => `
            <div class="flex gap-4 p-4 bg-zinc-900/20 border border-white/5 rounded-xl items-center" style="display: flex !important; gap: 1rem !important; padding: 1rem !important; background-color: rgba(24, 24, 27, 0.2) !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 0.75rem !important; align-items: center !important;">
              <div class="w-16 text-center shrink-0" style="width: 4rem !important; text-align: center !important; flex-shrink: 0 !important;">
                <span class="text-sm font-black italic uppercase leading-none" style="font-size: 0.875rem !important; font-weight: 900 !important; color: ${redColor} !important; font-style: italic !important; text-transform: uppercase !important; line-height: 1 !important;">${item.period}</span>
              </div>
              <div class="w-px h-8 bg-zinc-800" style="width: 1px !important; height: 2rem !important; background-color: #27272a !important;"></div>
              <div class="w-48 shrink-0" style="width: 12rem !important; flex-shrink: 0 !important;">
                <p class="text-sm font-bold text-zinc-100" style="font-size: 0.875rem !important; font-weight: bold !important; color: #f4f4f5 !important;">${item.title}</p>
              </div>
              <div class="flex-1" style="flex: 1 !important;">
                <p class="text-xs text-zinc-500 font-medium" style="font-size: 0.75rem !important; color: #71717a !important; font-weight: 500 !important;">${item.description}</p>
              </div>
            </div>
            `,
              )
              .join('')}
          </div>
        </section>

        <!-- 4.2 수행 조직 및 인력 & 4.3 개발 방법론 -->
        <section class="grid grid-cols-2 gap-6" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1.5rem !important; width: 100% !important;">
          <!-- 4.2 수행 조직 및 인력 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(239, 68, 68, 0.1) !important;">
                <span style="font-size: 1.25rem !important;">👥</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                  4.2 수행 조직 및 인력
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Resource Allocation</p>
              </div>
            </div>
            <div class="bg-zinc-900/40 p-6 rounded-2xl grid grid-cols-2 gap-4" style="background-color: rgba(24, 24, 27, 0.4) !important; padding: 1.5rem !important; border-radius: 1rem !important; display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1rem !important; width: 100% !important;">
              ${resources
                .map(
                  resource => `
              <div class="p-4 bg-zinc-950 rounded-xl border border-white/5 text-center" style="padding: 1rem !important; background-color: #09090b !important; border-radius: 0.75rem !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; text-align: center !important;">
                <p class="text-[10px] text-zinc-500 font-black uppercase mb-1" style="font-size: 10px !important; color: #71717a !important; font-weight: 900 !important; text-transform: uppercase !important; margin-bottom: 0.25rem !important;">${resource.role}</p>
                <p class="text-xs font-bold text-white italic" style="font-size: 0.75rem !important; font-weight: bold !important; color: white !important; font-style: italic !important;">${resource.name}</p>
              </div>
              `,
                )
                .join('')}
            </div>
          </div>
          
          <!-- 4.3 개발 방법론 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(239, 68, 68, 0.1) !important;">
                <span style="font-size: 1.25rem !important;">📚</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                  4.3 개발 방법론
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Agile Methodology</p>
              </div>
            </div>
            <div class="bg-zinc-900/40 p-6 rounded-2xl h-full flex flex-col justify-center text-center" style="background-color: rgba(24, 24, 27, 0.4) !important; padding: 1.5rem !important; border-radius: 1rem !important; height: 100% !important; display: flex !important; flex-direction: column !important; justify-content: center !important; text-align: center !important; width: 100% !important;">
              <p class="text-base font-bold text-white mb-2 italic" style="font-size: 1rem !important; font-weight: bold !important; color: white !important; margin-bottom: 0.5rem !important; font-style: italic !important;">${methodology.title}</p>
              <p class="text-xs text-zinc-500 leading-relaxed font-medium" style="font-size: 0.75rem !important; color: #71717a !important; line-height: 1.5 !important; font-weight: 500 !important;">${methodology.description}</p>
            </div>
          </div>
        </section>

        <!-- 4.4 품질 보증 계획 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: rgba(239, 68, 68, 0.1) !important;">
              <span style="font-size: 1.25rem !important;">✅</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: white !important;">
                4.4 품질 보증 계획
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Quality Assurance</p>
            </div>
          </div>
          
          <div class="grid grid-cols-3 gap-3" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 0.75rem !important; width: 100% !important;">
            ${qualityAssurance
              .slice(0, 3)
              .map(
                item => `
            <div class="p-4 bg-zinc-950 border border-white/5 rounded-xl flex items-center gap-3" style="padding: 1rem !important; background-color: #09090b !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; border-radius: 0.75rem !important; display: flex !important; align-items: center !important; gap: 0.75rem !important;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${redColor} !important;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span class="text-xs font-bold text-zinc-400" style="font-size: 0.75rem !important; font-weight: bold !important; color: #a1a1aa !important;">${item}</span>
            </div>
            `,
              )
              .join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}
