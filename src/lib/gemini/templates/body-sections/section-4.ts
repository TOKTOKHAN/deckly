/*본문 섹션 4: 사업 관리 부문 (Part IV: Project Management)*/
import type { BodySection4Data } from '../types';
import { getContrastTextColorWithGray, getCardTextColor } from '../constants';

export function generateBodySection4Template(
  data: BodySection4Data,
  brandColor1?: string,
  brandColor2?: string,
  brandColor3?: string,
  startDate?: string,
  endDate?: string,
): string {
  // 브랜드 컬러 설정
  const primaryColor = brandColor1 || '#4f46e5'; // 주요 강조, 제목, 아이콘
  const secondaryColor = brandColor2 || '#1f2937'; // 카드 배경, 보조 강조
  const tertiaryColor = brandColor3 || '#0a0c10'; // 경계선, 미묘한 배경

  // 배경색 밝기에 따라 텍스트 색상 결정
  const textColors = getContrastTextColorWithGray(tertiaryColor);

  // 카드 배경색에 따른 텍스트 색상 계산
  const cardTextColors = getCardTextColor(secondaryColor, tertiaryColor, 0.4);
  const darkCardTextColors = getCardTextColor(tertiaryColor, tertiaryColor, 0.3);

  // Hex to RGBA 변환 함수
  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // 미팅 전사록 기반으로 Gemini가 생성한 데이터 사용 (기본값 없음)
  const timeline = data.timeline || [];

  // 타임라인 관련 헬퍼 함수들
  // period 문자열 파싱 (M1 → [0], M2-M3 → [1, 2])
  const parsePeriod = (period: string): number[] => {
    const parts = period.split('-');
    if (parts.length === 1) {
      // M1 형식
      const match = parts[0].match(/M(\d+)/);
      if (match) {
        return [parseInt(match[1], 10) - 1]; // 0-based index
      }
    } else {
      // M2-M3 형식
      const startMatch = parts[0].match(/M(\d+)/);
      const endMatch = parts[1].match(/M(\d+)/);
      if (startMatch && endMatch) {
        const start = parseInt(startMatch[1], 10) - 1;
        const end = parseInt(endMatch[1], 10) - 1;
        const result: number[] = [];
        for (let i = start; i <= end; i++) {
          result.push(i);
        }
        return result;
      }
    }
    return [];
  };

  // 시작일과 종료일로부터 월 배열 생성
  const generateMonths = (
    start: string,
    end: string,
  ): Array<{ year: number; month: number; label: string }> => {
    if (!start || !end) return [];

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const months: Array<{ year: number; month: number; label: string }> = [];

    const current = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), 1);
    const endMonth = new Date(endDateObj.getFullYear(), endDateObj.getMonth(), 1);

    while (current <= endMonth) {
      months.push({
        year: current.getFullYear(),
        month: current.getMonth(),
        label: `${current.getFullYear()}년 ${current.getMonth() + 1}월`,
      });
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  };

  // 타임라인 HTML 생성
  const generateTimelineHTML = (): string => {
    if (!startDate || !endDate || timeline.length === 0) {
      // 기존 형식으로 폴백 (period 라벨 없이)
      if (timeline.length === 0) {
        return '<div style="padding: 1rem; color: #71717a; font-size: 0.875rem;">타임라인 데이터가 없습니다.</div>';
      }
      return `
          <div class="space-y-2" style="display: flex !important; flex-direction: column !important; gap: 0.5rem !important; width: 100% !important;">
            ${timeline
              .map(
                item => `
            <div class="flex gap-4 p-4 bg-zinc-900/20 border border-white/5 rounded-xl items-center" style="display: flex !important; gap: 1rem !important; padding: 1rem !important; background-color: ${hexToRgba(secondaryColor, 0.3)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; border-radius: 0.75rem !important; align-items: center !important;">
              <div class="w-48 shrink-0" style="width: 12rem !important; flex-shrink: 0 !important;">
                <p class="text-sm font-bold text-zinc-100" style="font-size: 0.875rem !important; font-weight: bold !important; color: ${cardTextColors.primary} !important;">${item.title}</p>
              </div>
              <div class="flex-1" style="flex: 1 !important;">
                <p class="text-xs text-zinc-500 font-medium" style="font-size: 0.75rem !important; color: ${cardTextColors.tertiary} !important; font-weight: 500 !important;">${item.description}</p>
              </div>
            </div>
            `,
              )
              .join('')}
          </div>
      `;
    }

    const months = generateMonths(startDate, endDate);
    if (months.length === 0) {
      return '<div>날짜 정보가 올바르지 않습니다.</div>';
    }

    // 각 timeline 아이템을 월 인덱스에 매핑
    const timelineMap = timeline.map(item => ({
      ...item,
      monthIndices: parsePeriod(item.period),
    }));

    // 테이블 헤더 생성
    const headerHTML = `
      <tr style="border-bottom: 1px solid ${hexToRgba(primaryColor, 0.2)} !important;">
        <th style="padding: 0.5rem 0.75rem !important; text-align: left !important; font-size: 0.875rem !important; font-weight: bold !important; color: ${textColors.primary} !important; vertical-align: top !important;">단계</th>
        ${months
          .map(
            month =>
              `<th style="padding: 0.5rem 0.5rem !important; text-align: center !important; font-size: 0.75rem !important; font-weight: 600 !important; color: ${textColors.secondary} !important; min-width: 3rem !important;">${month.month + 1}월</th>`,
          )
          .join('')}
      </tr>
    `;

    // 테이블 행 생성
    const rowsHTML = timelineMap
      .map(item => {
        const sortedIndices = [...item.monthIndices].sort((a, b) => a - b);
        const startIndex = sortedIndices[0];

        // 타임라인 막대 생성
        let timelineBar = '';
        if (sortedIndices.length > 0) {
          const borderRadius = sortedIndices.length === 1 ? '0.25rem' : '0.25rem';
          const leftPercent = (startIndex / months.length) * 100;
          const widthPercent = (sortedIndices.length / months.length) * 100;

          timelineBar = `
            <div style="
              background-color: ${primaryColor} !important;
              height: 1.25rem !important;
              border-radius: ${borderRadius} !important;
              position: absolute !important;
              left: ${leftPercent}% !important;
              width: ${widthPercent}% !important;
              top: 50% !important;
              transform: translateY(-50%) !important;
            "></div>
          `;
        }

        return `
          <tr style="border-bottom: 1px solid ${hexToRgba(primaryColor, 0.1)} !important;">
            <td style="padding: 0.5rem 0.75rem !important; text-align: left !important; vertical-align: top !important;">
              <p style="font-size: 0.875rem !important; font-weight: bold !important; color: ${cardTextColors.primary} !important; margin-bottom: 0.125rem !important; line-height: 1.4 !important;">${item.title}</p>
              <p style="font-size: 0.75rem !important; color: ${cardTextColors.tertiary} !important; font-weight: 400 !important; line-height: 1.4 !important;">${item.description}</p>
            </td>
            <td colspan="${months.length}" style="padding: 0.375rem 0 !important; position: relative !important;">
              <div style="display: grid !important; grid-template-columns: repeat(${months.length}, 1fr) !important; gap: 0 !important; position: relative !important; width: 100% !important; height: 2rem !important;">
                ${timelineBar}
              </div>
            </td>
          </tr>
        `;
      })
      .join('');

    return `
      <div style="overflow-x: auto !important; width: 100% !important;">
        <table style="width: 100% !important; border-collapse: collapse !important; border-spacing: 0 !important;">
          <thead>
            ${headerHTML}
          </thead>
          <tbody>
            ${rowsHTML}
          </tbody>
        </table>
      </div>
    `;
  };

  const resources = data.resources || [];

  const methodology = data.methodology || {
    title: '',
    description: '',
  };

  const qualityAssurance = data.qualityAssurance || [];

  return `
    <div class="a4-page body-section flex flex-col" style="background-color: ${tertiaryColor} !important; color: ${textColors.primary} !important; position: relative !important; overflow: visible !important; width: 210mm !important; min-height: 297mm !important; height: auto !important; padding: 2rem !important; margin: 0 !important; max-width: 210mm !important;">
      
      <!-- Main Title -->
      <div class="mb-6" style="margin-bottom: 1.5rem !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${secondaryColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${secondaryColor} !important; text-transform: uppercase !important;">Part IV</span>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: ${textColors.primary} !important; margin-bottom: 0.5rem !important;">
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
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">📊</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                4.1 추진 일정
              </h2>
              <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Execution Roadmap</p>
            </div>
          </div>
          
          ${generateTimelineHTML()}
        </section>

        <!-- 4.2 수행 조직 및 인력 & 4.3 개발 방법론 -->
        <section class="grid grid-cols-2 gap-6" style="display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1.5rem !important; width: 100% !important;">
          <!-- 4.2 수행 조직 및 인력 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
                <span style="font-size: 1.25rem !important;">👥</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                  4.2 수행 조직 및 인력
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Resource Allocation</p>
              </div>
            </div>
            <div class="bg-zinc-900/40 p-6 rounded-2xl grid grid-cols-2 gap-4" style="background-color: ${hexToRgba(secondaryColor, 0.4)} !important; padding: 1.5rem !important; border-radius: 1rem !important; display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1rem !important; width: 100% !important;">
              ${resources
                .map(
                  resource => `
              <div class="p-4 bg-zinc-950 rounded-xl border border-white/5 text-center" style="padding: 1rem !important; background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border-radius: 0.75rem !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; text-align: center !important;">
                <p class="text-[10px] text-zinc-500 font-black uppercase mb-1" style="font-size: 10px !important; color: #71717a !important; font-weight: 900 !important; text-transform: uppercase !important; margin-bottom: 0.25rem !important;">${resource.role}</p>
                <p class="text-xs font-bold text-white italic" style="font-size: 0.75rem !important; font-weight: bold !important; color: ${darkCardTextColors.primary} !important; font-style: italic !important;">${resource.name}</p>
              </div>
              `,
                )
                .join('')}
            </div>
          </div>
          
          <!-- 4.3 개발 방법론 -->
          <div style="width: 100% !important;">
            <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
                <span style="font-size: 1.25rem !important;">📚</span>
              </div>
              <div>
                <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
                  4.3 개발 방법론
                </h2>
                <p class="text-[10px] text-zinc-500 uppercase tracking-wider" style="font-size: 10px !important; color: #71717a !important; text-transform: uppercase !important; letter-spacing: 0.05em !important;">Agile Methodology</p>
              </div>
            </div>
            <div class="bg-zinc-900/40 p-6 rounded-2xl h-full flex flex-col justify-center text-center" style="background-color: ${hexToRgba(secondaryColor, 0.4)} !important; padding: 1.5rem !important; border-radius: 1rem !important; height: 100% !important; display: flex !important; flex-direction: column !important; justify-content: center !important; text-align: center !important; width: 100% !important;">
              <p class="text-base font-bold text-white mb-2 italic" style="font-size: 1rem !important; font-weight: bold !important; color: ${textColors.primary} !important; margin-bottom: 0.5rem !important; font-style: italic !important;">${methodology.title}</p>
              <p class="text-xs text-zinc-500 leading-relaxed font-medium" style="font-size: 0.75rem !important; color: #71717a !important; line-height: 1.5 !important; font-weight: 500 !important;">${methodology.description}</p>
            </div>
          </div>
        </section>

        <!-- 4.4 품질 보증 계획 -->
        <section style="page-break-inside: avoid !important; break-inside: avoid !important; width: 100% !important;">
          <div class="flex items-center gap-3 mb-3" style="display: flex !important; align-items: center !important; gap: 0.75rem !important; margin-bottom: 0.75rem !important;">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="width: 2rem !important; height: 2rem !important; border-radius: 0.5rem !important; display: flex !important; align-items: center !important; justify-content: center !important; background-color: ${hexToRgba(primaryColor, 0.15)} !important;">
              <span style="font-size: 1.25rem !important;">✅</span>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white" style="font-size: 1.25rem !important; font-weight: bold !important; color: ${textColors.primary} !important;">
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
            <div class="p-4 bg-zinc-950 border border-white/5 rounded-xl flex items-center gap-3" style="padding: 1rem !important; background-color: ${hexToRgba(tertiaryColor, 0.3)} !important; border: 1px solid ${hexToRgba(primaryColor, 0.12)} !important; border-radius: 0.75rem !important; display: flex !important; align-items: center !important; gap: 0.75rem !important;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: ${primaryColor} !important;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span class="text-xs font-bold text-zinc-400" style="font-size: 0.75rem !important; font-weight: bold !important; color: ${darkCardTextColors.secondary} !important;">${item}</span>
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
