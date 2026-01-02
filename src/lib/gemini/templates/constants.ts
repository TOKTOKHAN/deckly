/* Tailwind 테마 기반 디자인 시스템 상수 */
export const TAILWIND_THEME = {
  colors: {
    primary: 'indigo-600',
    secondary: 'gray-800',
    accent: 'indigo-500',
    background: 'white',
    text: 'gray-900',
  },
  spacing: {
    section: 'p-8',
    card: 'p-6',
    title: 'mb-6',
  },
  typography: {
    font: 'font-sans',
    title: 'text-3xl font-bold',
    subtitle: 'text-xl font-semibold',
    body: 'text-base',
  },
};

/**
 * HEX 색상의 밝기를 계산합니다 (0-255)
 * @param hex HEX 색상 코드 (예: #4f46e5)
 * @returns 밝기 값 (0-255, 높을수록 밝음)
 */
export function getColorBrightness(hex: string): number {
  // # 제거
  const cleanHex = hex.replace('#', '');

  // RGB 값 추출
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);

  // 상대적 밝기 계산 (WCAG 기준)
  // 0.2126 * R + 0.7152 * G + 0.0722 * B
  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return brightness;
}

/**
 * 배경색에 따라 적절한 텍스트 색상을 반환합니다
 * @param backgroundColor 배경색 HEX 코드
 * @returns 텍스트 색상 HEX 코드 (#ffffff 또는 #000000)
 */
export function getContrastTextColor(backgroundColor: string): string {
  const brightness = getColorBrightness(backgroundColor);

  // 밝기 기준값: 128 (중간값)
  // 밝은 배경(>128) → 어두운 텍스트, 어두운 배경(≤128) → 밝은 텍스트
  return brightness > 128 ? '#000000' : '#ffffff';
}

/**
 * 배경색에 따라 적절한 텍스트 색상을 반환합니다 (회색 톤 포함)
 * @param backgroundColor 배경색 HEX 코드
 * @returns 텍스트 색상 HEX 코드
 */
export function getContrastTextColorWithGray(backgroundColor: string): {
  primary: string; // 주요 텍스트 색상
  secondary: string; // 보조 텍스트 색상 (더 연한 톤)
  tertiary: string; // 3차 텍스트 색상 (가장 연한 톤)
} {
  const brightness = getColorBrightness(backgroundColor);

  if (brightness > 128) {
    // 밝은 배경 → 어두운 텍스트
    return {
      primary: '#000000', // 검정
      secondary: '#1a1a1a', // 매우 어두운 회색
      tertiary: '#3f3f46', // 어두운 회색
    };
  } else {
    // 어두운 배경 → 밝은 텍스트
    return {
      primary: '#ffffff', // 흰색
      secondary: '#f5f5f5', // 매우 밝은 회색
      tertiary: '#a1a1aa', // 밝은 회색
    };
  }
}

/**
 * HEX 색상 코드를 RGB 객체로 변환합니다
 * @param hex HEX 색상 코드 (예: #4f46e5)
 * @returns RGB 객체 { r, g, b }
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace('#', '');
  return {
    r: parseInt(cleanHex.slice(0, 2), 16),
    g: parseInt(cleanHex.slice(2, 4), 16),
    b: parseInt(cleanHex.slice(4, 6), 16),
  };
}

/**
 * HEX 색상 코드를 RGBA 문자열로 변환합니다
 * @param hex HEX 색상 코드 (예: #4f46e5)
 * @param alpha 투명도 (0-1)
 * @returns RGBA 문자열 (예: rgba(79, 70, 229, 0.5)
 */
export function hexToRgba(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * 투명도가 적용된 색상을 배경색 위에 블렌딩한 실제 색상을 계산합니다
 * @param foregroundColor 전경색 HEX 코드
 * @param backgroundColor 배경색 HEX 코드
 * @param alpha 투명도 (0-1)
 * @returns 블렌딩된 실제 색상 HEX 코드
 */
export function blendColors(
  foregroundColor: string,
  backgroundColor: string,
  alpha: number,
): string {
  const fg = hexToRgb(foregroundColor);
  const bg = hexToRgb(backgroundColor);

  // 블렌딩 공식: result = (foreground * alpha) + (background * (1 - alpha))
  const r = Math.round(fg.r * alpha + bg.r * (1 - alpha));
  const g = Math.round(fg.g * alpha + bg.g * (1 - alpha));
  const b = Math.round(fg.b * alpha + bg.b * (1 - alpha));

  // RGB를 HEX로 변환
  const toHex = (n: number): string => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * 카드 배경색에 따라 적절한 텍스트 색상을 반환합니다
 * @param cardColor 카드 배경색 HEX 코드
 * @param pageBackgroundColor 페이지 배경색 HEX 코드
 * @param alpha 카드 배경색의 투명도 (0-1)
 * @returns 텍스트 색상 객체
 */
export function getCardTextColor(
  cardColor: string,
  pageBackgroundColor: string,
  alpha: number,
): {
  primary: string;
  secondary: string;
  tertiary: string;
} {
  // 실제 카드 배경색 계산 (투명도 적용)
  const actualCardColor = blendColors(cardColor, pageBackgroundColor, alpha);
  return getContrastTextColorWithGray(actualCardColor);
}

/**
 * 배경색에 대한 보색(complementary color)을 계산합니다
 * 보색은 색상환에서 정반대에 위치한 색상으로, 강한 대비를 제공합니다.
 * @param backgroundColor 배경색 HEX 코드
 * @returns 보색 HEX 코드
 */
export function getComplementaryColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);

  // 보색 계산: 각 RGB 값을 255에서 빼기
  const complementary = {
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
  };

  // RGB를 HEX로 변환
  const toHex = (n: number): string => {
    const hex = Math.max(0, Math.min(255, n)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(complementary.r)}${toHex(complementary.g)}${toHex(complementary.b)}`;
}

/**
 * 배경색과 충분한 대비를 가지는 border 색상을 반환합니다
 * 보색을 사용하되, 대비가 충분하지 않으면 밝기를 조정합니다.
 * @param backgroundColor 배경색 HEX 코드
 * @param _originalColor 원래 border 색상 HEX 코드 (선택적, 향후 사용 예정)
 * @returns 대비가 충분한 border 색상 HEX 코드
 */
export function getContrastBorderColor(backgroundColor: string, _originalColor?: string): string {
  // 보색 계산
  const complementary = getComplementaryColor(backgroundColor);

  // 배경색과 보색의 밝기 계산
  const bgBrightness = getColorBrightness(backgroundColor);
  const compBrightness = getColorBrightness(complementary);

  // 밝기 차이가 충분한지 확인 (최소 50 이상)
  const brightnessDiff = Math.abs(bgBrightness - compBrightness);

  if (brightnessDiff >= 50) {
    // 대비가 충분하면 보색 사용
    return complementary;
  } else {
    // 대비가 부족하면 밝기 조정
    // 배경이 어두우면 밝은 색, 밝으면 어두운 색
    if (bgBrightness < 128) {
      // 어두운 배경 → 밝은 border
      return '#ffffff';
    } else {
      // 밝은 배경 → 어두운 border
      return '#000000';
    }
  }
}

/**
 * A4 페이지 컨테이너 스타일을 생성합니다
 * @param backgroundColor 배경색 HEX 코드
 * @param textColor 텍스트 색상 HEX 코드
 * @returns 인라인 스타일 문자열
 */
export function getA4PageContainerStyle(backgroundColor: string, textColor: string): string {
  return `background-color: ${backgroundColor} !important; color: ${textColor} !important; position: relative !important; overflow: visible !important; width: 210mm !important; min-height: 297mm !important; height: auto !important; padding: 2rem !important; margin: 0 !important; max-width: 210mm !important;`;
}

/**
 * 브랜드 컬러를 기본값과 함께 반환합니다
 * @param brandColor1 주요 강조 컬러 (기본값: #4f46e5)
 * @param brandColor2 카드 배경, 보조 강조 컬러 (기본값: #1f2937)
 * @param brandColor3 경계선, 미묘한 배경 컬러 (기본값: #0a0c10)
 * @returns 브랜드 컬러 객체
 */
export function getBrandColors(
  brandColor1?: string,
  brandColor2?: string,
  brandColor3?: string,
): {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
} {
  return {
    primaryColor: brandColor1 || '#4f46e5', // 주요 강조, 제목, 아이콘
    secondaryColor: brandColor2 || '#1f2937', // 카드 배경, 보조 강조
    tertiaryColor: brandColor3 || '#0a0c10', // 경계선, 미묘한 배경
  };
}

/**
 * 섹션 헤더 HTML을 생성합니다
 * @param partNumber Part 번호 (예: "I", "II", "III", "IV", "V")
 * @param koreanTitle 한글 제목
 * @param englishTitle 영문 부제목
 * @param description 설명 문구
 * @param accentColor 강조 색상 HEX 코드
 * @param textColors 텍스트 색상 객체
 * @returns 섹션 헤더 HTML 문자열
 */
export function generateSectionHeader(
  partNumber: string,
  koreanTitle: string,
  englishTitle: string,
  description: string,
  accentColor: string,
  textColors: { primary: string },
): string {
  return `
      <!-- Main Title -->
      <div class="mb-6" style="margin-bottom: 1.5rem !important;">
        <div class="flex items-center gap-4 mb-2" style="display: flex !important; align-items: center !important; gap: 1rem !important; margin-bottom: 0.5rem !important;">
          <div class="h-0.5 w-10" style="height: 2px !important; width: 2.5rem !important; background-color: ${accentColor} !important;"></div>
          <span class="text-[10px] font-black tracking-[0.5em] uppercase" style="font-size: 10px !important; font-weight: 900 !important; letter-spacing: 0.5em !important; color: ${accentColor} !important; text-transform: uppercase !important;">Part ${partNumber}</span>
        </div>
        <h1 class="text-4xl font-black tracking-tight text-white mb-2" style="font-size: 2.25rem !important; font-weight: 900 !important; letter-spacing: -0.025em !important; color: ${textColors.primary} !important; margin-bottom: 0.5rem !important;">
          ${koreanTitle}
          <span class="block text-sm font-light italic tracking-widest uppercase mt-1" style="display: block !important; font-size: 0.875rem !important; font-weight: 300 !important; font-style: italic !important; letter-spacing: 0.1em !important; color: #71717a !important; text-transform: uppercase !important; margin-top: 0.25rem !important;">${englishTitle}</span>
        </h1>
        <p class="text-sm text-zinc-400 mt-2" style="font-size: 0.875rem !important; color: #a1a1aa !important; margin-top: 0.5rem !important;">
          ${description}
        </p>
      </div>
  `;
}
