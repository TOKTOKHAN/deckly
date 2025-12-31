/* 제안서 끝마무리 템플릿 */
import type { TemplateData } from './types';

export function generateConclusionTemplate(data: TemplateData): string {
  // 브랜드 컬러 추출
  const primaryColor = data.brandColor1 || '#4f46e5'; // 기본값: indigo-600
  const secondaryColor = data.brandColor2 || '#1f2937'; // 기본값: gray-800
  const tertiaryColor = data.brandColor3 || '#0a0c10';
  const darkBg = '#0a0c10';

  // 브랜드 컬러를 rgba로 변환 (투명도 20%용)
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const primaryColorRgba = hexToRgba(primaryColor, 0.05);
  const secondaryColorRgba = hexToRgba(secondaryColor, 0.05);

  // Promise 데이터
  const promises = [
    {
      id: '01',
      title: '검증된 전문성',
      desc: '다년간의 프로젝트 경험과\n검증된 기술력으로\n안정적인 시스템 구축',
      bgColor: `bg-[${hexToRgba(primaryColor, 0.2)}]`,
      color: primaryColor,
    },
    {
      id: '02',
      title: '핵심 인력 투입',
      desc: '최고의 전문가들이\n직접 참여하여\n품질을 보장합니다',
      bgColor: `bg-[${hexToRgba(primaryColor, 0.2)}]`,
      color: primaryColor,
    },
    {
      id: '03',
      title: '상생의 파트너십',
      desc: '단순 계약이 아닌\n장기적인 파트너로서\n함께 성장합니다',
      bgColor: `bg-[${hexToRgba(primaryColor, 0.2)}]`,
      color: primaryColor,
    },
  ];

  return `
    <div class="a4-page flex flex-col relative" style="background-color: ${darkBg} !important; color: white !important; position: relative !important; overflow: hidden !important; width: 210mm !important; min-height: 297mm !important;">
      
      <!-- Background Effects -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden" style="position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important; pointer-events: none !important; overflow: hidden !important;">
        <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px]" style="position: absolute !important; top: -10% !important; right: -10% !important; width: 500px !important; height: 500px !important; border-radius: 9999px !important; filter: blur(120px) !important; background-color: ${primaryColorRgba} !important;"></div>
        <div class="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style="position: absolute !important; bottom: -10% !important; left: -10% !important; width: 500px !important; height: 500px !important; border-radius: 9999px !important; filter: blur(100px) !important; background-color: ${secondaryColorRgba} !important;"></div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 px-16 pt-20 flex flex-col justify-center items-center z-10 text-center" style="flex: 1 !important; padding-left: 4rem !important; padding-right: 4rem !important; padding-top: 5rem !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; text-align: center !important; position: relative !important; z-index: 10 !important;">
        
        <!-- Logo Collaboration Section -->
        <div class="flex items-center justify-center gap-8 mb-12" style="display: flex !important; align-items: center !important; justify-content: center !important; gap: 2rem !important; margin-bottom: 3rem !important;">
          <div class="flex flex-col items-center gap-2" style="display: flex !important; flex-direction: column !important; align-items: center !important; gap: 0.5rem !important;">
            ${
              data.clientLogo
                ? `<img src="${data.clientLogo}" alt="${data.clientCompanyName} 로고" class="w-16 h-16" style="width: 4rem !important; height: 4rem !important; object-fit: contain !important;" />`
                : `<svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 4rem !important; height: 4rem !important;">
                    <path d="M50 0L0 50L50 100L100 50L50 0Z" fill="${tertiaryColor}"/>
                    <path d="M50 0V100L100 50L50 0Z" fill="${primaryColor}"/>
                    <circle cx="28" cy="42" r="6" fill="white"/>
                    <circle cx="28" cy="58" r="6" fill="white"/>
                    <circle cx="72" cy="50" r="6" fill="white"/>
                  </svg>`
            }
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase" style="font-size: 9px !important; font-weight: bold !important; letter-spacing: 0.2em !important; color: #71717a !important; text-transform: uppercase !important;">${data.clientCompanyName || 'Client'}</span>
          </div>
          
          <div class="h-6 w-px rotate-12" style="height: 1.5rem !important; width: 1px !important; background-color: #27272a !important; transform: rotate(12deg) !important;"></div>
          <span class="text-lg font-light" style="font-size: 1.125rem !important; font-weight: 300 !important; color: #52525b !important;">X</span>
          <div class="h-6 w-px rotate-12" style="height: 1.5rem !important; width: 1px !important; background-color: #27272a !important; transform: rotate(12deg) !important;"></div>

          <div class="flex flex-col items-center gap-2" style="display: flex !important; flex-direction: column !important; align-items: center !important; gap: 0.5rem !important;">
            <img src="${data.ourLogo || '/images/tokdev-logo.jpg'}" alt="TOKTOKHAN.DEV 로고" class="w-16 h-16 rounded-lg" style="width: 4rem !important; height: 4rem !important; border-radius: 0.5rem !important; object-fit: contain !important;" />
            <span class="text-[9px] font-bold tracking-[0.2em] uppercase" style="font-size: 9px !important; font-weight: bold !important; letter-spacing: 0.2em !important; color: #71717a !important; text-transform: uppercase !important;">Toktokhan</span>
          </div>
        </div>

        <!-- Main Title -->
        <div class="mb-8" style="margin-bottom: 2rem !important;">
          <h1 class="text-4xl font-black leading-[1.2] tracking-tight mb-5" style="font-size: 2.25rem !important; font-weight: 900 !important; line-height: 1.2 !important; letter-spacing: -0.025em !important; margin-bottom: 1.25rem !important; color: white !important;">
            ${data.clientCompanyName || '고객사'}의 <span style="color: ${primaryColor} !important; font-style: italic !important;">성공적인 미래,</span><br />
            <span style="text-decoration: underline !important; text-decoration-color: ${tertiaryColor} !important; text-decoration-thickness: 3px !important; text-underline-offset: 0.5rem !important; color: white !important;">TOKTOKHAN.DEV</span>가 함께하겠습니다.
          </h1>
          <div class="h-1 w-20 mx-auto rounded-full" style="height: 0.25rem !important; width: 5rem !important; margin-left: auto !important; margin-right: auto !important; border-radius: 9999px !important; background: linear-gradient(to right, ${primaryColor}, ${tertiaryColor}) !important;"></div>
        </div>

        <!-- Core Message -->
        <p class="text-xl font-light leading-relaxed mb-14 max-w-2xl" style="font-size: 1.25rem !important; font-weight: 300 !important; color: #a1a1aa !important; line-height: 1.75 !important; margin-bottom: 3.5rem !important; max-width: 42rem !important;">
          "안정적인 <span style="color: white !important; font-weight: 500 !important;">기술력</span>과 책임감 있는 <span style="color: white !important; font-weight: 500 !important;">수행</span>으로<br />
          무결점 시스템 구축을 약속합니다."
        </p>

        <!-- Three Promises Grid -->
        <div class="grid grid-cols-3 gap-5 w-full max-w-4xl mb-16" style="display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 1.25rem !important; width: 100% !important; max-width: 56rem !important; margin-bottom: 4rem !important;">
          ${promises
            .map(
              p => `
          <div class="relative group p-6 rounded-2xl border backdrop-blur-sm" style="position: relative !important; padding: 1.5rem !important; border-radius: 1rem !important; background-color: ${hexToRgba(secondaryColor, 0.3)} !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; backdrop-filter: blur(4px) !important;">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5" style="width: 3rem !important; height: 3rem !important; border-radius: 0.75rem !important; display: flex !important; align-items: center !important; justify-content: center !important; margin-left: auto !important; margin-right: auto !important; margin-bottom: 1.25rem !important; background-color: ${hexToRgba(p.color, 0.2)} !important;">
              <span style="font-size: 1.5rem !important; font-weight: 900 !important; color: ${p.color} !important;">${p.id}</span>
            </div>
            <span class="text-[9px] font-black tracking-[0.3em] mb-2 block uppercase" style="font-size: 9px !important; font-weight: 900 !important; letter-spacing: 0.3em !important; color: #52525b !important; margin-bottom: 0.5rem !important; display: block !important; text-transform: uppercase !important;">Promise ${p.id}</span>
            <h3 class="text-base font-bold text-white mb-3" style="font-size: 1rem !important; font-weight: bold !important; color: white !important; margin-bottom: 0.75rem !important;">${p.title}</h3>
            <p class="text-[13px] leading-relaxed whitespace-pre-line font-medium" style="font-size: 13px !important; color: #71717a !important; line-height: 1.75 !important; white-space: pre-line !important; font-weight: 500 !important;">
              ${p.desc}
            </p>
          </div>
          `,
            )
            .join('')}
        </div>

        <!-- Signature Area -->
        <div class="relative group" style="position: relative !important;">
          <p class="text-[10px] tracking-[0.4em] uppercase mb-3 font-bold" style="font-size: 10px !important; letter-spacing: 0.4em !important; color: #71717a !important; margin-bottom: 0.75rem !important; text-transform: uppercase !important; font-weight: bold !important;">Trusted Partner</p>
          <h2 class="text-3xl font-black tracking-tighter text-white mb-2 leading-none" style="font-size: 1.875rem !important; font-weight: 900 !important; letter-spacing: -0.05em !important; color: white !important; margin-bottom: 0.5rem !important; line-height: 1 !important;">TOKTOKHAN.DEV</h2>
          <div class="flex items-center justify-center gap-1.5 mt-4" style="display: flex !important; align-items: center !important; justify-content: center !important; gap: 0.375rem !important; margin-top: 1rem !important;">
            <div class="w-1 h-1 rounded-full" style="width: 0.25rem !important; height: 0.25rem !important; border-radius: 9999px !important; background-color: ${primaryColor} !important;"></div>
            <div class="w-10 h-[1px]" style="width: 2.5rem !important; height: 1px !important; background-color: #27272a !important;"></div>
            <div class="w-1 h-1 rounded-full" style="width: 0.25rem !important; height: 0.25rem !important; border-radius: 9999px !important; background-color: ${tertiaryColor} !important;"></div>
          </div>
        </div>
      </div>

      <!-- Footer Area -->
      <div class="cover-footer px-16 pb-16 z-10 relative" style="padding-left: 4rem !important; padding-right: 4rem !important; padding-bottom: 2rem !important; padding-top: 1rem !important; position: relative !important; z-index: 10 !important;">
        <div class="h-px w-full mb-10" style="height: 1px !important; width: 100% !important; background: linear-gradient(to right, rgba(30, 58, 138, 0.5), rgba(39, 39, 42, 0.8), transparent) !important; margin-bottom: 1.5rem !important;"></div>
        
        <div class="flex justify-between items-end" style="display: flex !important; justify-content: space-between !important; align-items: flex-end !important;">
          <!-- Agency Info -->
          <div class="space-y-6" style="display: flex !important; flex-direction: column !important; gap: 1.5rem !important;">
            
            
            <div class="flex gap-5" style="display: flex !important; gap: 1rem !important;">
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: ${tertiaryColor} !important;">📍</span> Address
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">서울시 마포구 동교로 12안길 39</p>
              </div>
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: ${primaryColor} !important;">🌐</span> Contact
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">sales@toktokhan.dev</p>
              </div>
              <div class="space-y-1" style="display: flex !important; flex-direction: column !important; gap: 0.25rem !important;">
                <p class="text-[10px] flex items-center gap-1.5 uppercase tracking-wider font-bold" style="font-size: 10px !important; color: #71717a !important; display: flex !important; align-items: center !important; gap: 0.375rem !important; text-transform: uppercase !important; letter-spacing: 0.05em !important; font-weight: bold !important;">
                  <span style="color: #71717a !important;">📞</span> Phone
                </p>
                <p class="text-[11px]" style="font-size: 11px !important; color: #a1a1aa !important;">010-2493-2906</p>
              </div>
            </div>
          </div>

          <!-- Security & Copyright -->
          <div class="text-right flex flex-col items-end gap-3" style="text-align: right !important; display: flex !important; flex-direction: column !important; align-items: flex-end !important; gap: 0.75rem !important;">
            <div class="inline-flex items-center px-4 py-1.5 rounded-full border gap-2" style="display: inline-flex !important; align-items: center !important; padding-left: 1rem !important; padding-right: 1rem !important; padding-top: 0.375rem !important; padding-bottom: 0.375rem !important; background-color: rgba(39, 39, 42, 1) !important; border: 1px solid rgba(30, 58, 138, 0.3) !important; border-radius: 9999px !important; gap: 0.5rem !important;">
              <span class="text-[10px] font-black uppercase tracking-[0.2em]" style="font-size: 10px !important; color: rgba(191, 219, 254, 1) !important; font-weight: 900 !important; text-transform: uppercase !important; letter-spacing: 0.2em !important;">
                Confidential Partnership
              </span>
            </div>
            <p class="text-[9px] leading-relaxed font-medium" style="font-size: 9px !important; color: #52525b !important; line-height: 1.625 !important; font-weight: 500 !important;">
              본 문서는 기술적/영업적 기밀을 포함하고 있으므로 무단 복제 및 유출을 금합니다.<br/>
              © 2025 Toktokhan.dev. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;
}
