/*HTML 래퍼 함수 생성된 템플릿 HTML을 완전한 HTML 문서로 감싸는 함수입니다. Tailwind CSS, 폰트, 인쇄용 스타일 등을 포함합니다. */
export function generateHTMLWrapper(
  bodyContent: string,
  font?: string,
  brandColor1?: string,
  brandColor2?: string,
  brandColor3?: string,
): string {
  // 폰트에 따른 CDN 링크 설정
  const getFontLink = (fontName?: string): string => {
    switch (fontName) {
      case 'Noto Sans KR':
        return '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">';
      case 'Inter':
        return '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">';
      case 'Pretendard':
      default:
        return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />';
    }
  };

  const fontFamily = font || 'Pretendard';
  const fontLink = getFontLink(font);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>제안서</title>
  <script src="https://cdn.tailwindcss.com"></script>
  ${fontLink}
  <style>
    * {
      font-family: '${fontFamily}', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
    }
    :root {
      --primary: ${brandColor1};
      --secondary: ${brandColor2};
      --tertiary: ${brandColor3};
    }
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
    @media print {
      @page { 
        margin: 0; 
        size: A4; 
      }
      body { 
        margin: 0; 
        padding: 0; 
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important; 
        orphans: 3;
        widows: 3;
      }
      .a4-page {
        width: 210mm;
        min-height: 297mm;
        height: auto;
        page-break-after: always;
        page-break-inside: auto;
        margin: 0;
        padding: 10mm;
        box-sizing: border-box;
        border: none;
        box-shadow: none;
        overflow: visible;
        display: flex;
        flex-direction: column;
      }
      /* 표지 페이지는 패딩 제거하고 중앙 정렬 */
      .a4-page:first-child {
        padding: 0 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
      }
      .a4-page:first-child > div {
        width: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
      }
      /* 표지 Top Header는 양쪽 끝 정렬 유지 */
      .a4-page:first-child .cover-top-header {
        display: flex !important;
        flex-direction: row !important;
        align-items: baseline !important;
        justify-content: space-between !important;
        text-align: left !important;
        width: 100% !important;
        box-sizing: border-box !important;
      }
      .a4-page:first-child .cover-top-header > div:first-child {
        flex-shrink: 0 !important;
      }
      .a4-page:first-child .cover-top-header > div:last-child {
        margin-left: auto !important;
        flex-shrink: 0 !important;
        text-align: right !important;
      }
      /* 표지 Footer는 양쪽 끝 정렬 유지 */
      .a4-page:first-child .cover-footer {
        display: block !important;
        text-align: left !important;
      }
      .a4-page:first-child .cover-footer > div:first-of-type {
        display: block !important;
      }
      .a4-page:first-child .cover-footer > div:last-of-type {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: flex-end !important;
        text-align: left !important;
      }
      /* 마무리 페이지 (세 번째 a4-page) - 표지와 동일한 패딩 처리 */
      .a4-page:nth-child(3) {
        padding: 0 !important;
        display: flex !important;
        flex-direction: column !important;
      }
      .a4-page:nth-child(3) > div {
        width: 100% !important;
      }
      /* 마무리 Footer는 표지와 동일하게 처리 */
      .a4-page:nth-child(3) .cover-footer {
        display: block !important;
        text-align: left !important;
      }
      .a4-page:nth-child(3) .cover-footer > div:first-of-type {
        display: block !important;
      }
      .a4-page:nth-child(3) .cover-footer > div:last-of-type {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        align-items: flex-end !important;
        text-align: left !important;
      }
      /* 목차 카드의 shadow만 제거 (border는 유지) */
      .a4-page .rounded-xl,
      .a4-page [class*="rounded-xl"] {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        filter: none !important;
      }
      /* 인라인 스타일의 shadow도 무시하도록 */
      .a4-page [style*="box-shadow"] {
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
      }
      /* 제목이 페이지 끝에 혼자 남지 않도록 */
      h2, h3 {
        page-break-after: avoid;
        break-after: avoid;
        orphans: 3;
        widows: 3;
      }
      /* 제목과 다음 내용이 분리되지 않도록 */
      h2 + *, h3 + * {
        page-break-before: avoid;
        break-before: avoid;
      }
      /* 제목 바로 다음에 페이지 브레이크가 오지 않도록 */
      h2, h3 {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      /* 섹션 내용이 자연스럽게 분할되도록 */
      .section-content {
        page-break-inside: auto;
        break-inside: auto;
      }
      /* proposal-section은 내용이 길면 자동으로 다음 페이지로 넘어가도록 */
      .proposal-section {
        page-break-inside: auto;
        break-inside: auto;
        orphans: 3;
        widows: 3;
      }
      /* 본문 섹션 텍스트 크기 축소 (공간 절약) */
      .proposal-section h2 {
        font-size: 1.5rem !important; /* text-2xl */
      }
      .proposal-section h3 {
        font-size: 1.125rem !important; /* text-lg */
      }
      .proposal-section p,
      .proposal-section li,
      .proposal-section div:not([class*="text-"]) {
        font-size: 0.875rem !important; /* text-sm */
      }
      /* 리스트나 테이블이 페이지를 넘어갈 때 자연스럽게 분할 */
      ul, ol, li {
        page-break-inside: auto;
        break-inside: auto;
      }
      /* 단락이 페이지 끝에서 잘리지 않도록 */
      p {
        orphans: 3;
        widows: 3;
        page-break-inside: avoid;
        break-inside: avoid;
      }
      /* 마지막 페이지는 page-break-after 제거 */
      .a4-page:last-child {
        page-break-after: auto;
      }
      /* 내용이 넘치면 자동으로 다음 페이지로 */
      .a4-page {
        overflow: visible !important;
      }
      /* 본문 섹션 - 내용이 길면 자동으로 다음 페이지로 */
      .a4-page.body-section {
        page-break-after: auto !important;
        min-height: auto !important;
        height: auto !important;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        text-align: left !important;
        padding: 0 !important;
        width: 210mm !important;
        max-width: 210mm !important;
      }
      /* 본문 섹션 내부 컨테이너 중앙정렬 제거 */
      .a4-page.body-section > div {
        align-items: flex-start !important;
        justify-content: flex-start !important;
        text-align: left !important;
        width: 100% !important;
      }
      /* 본문 섹션 내부 섹션들이 페이지 중간에서 잘리지 않도록 */
      .a4-page.body-section section {
        page-break-inside: avoid !important;
        break-inside: avoid !important;
        width: 100% !important;
      }
      /* 본문 섹션의 그리드 컨테이너가 전체 너비 사용 */
      .a4-page.body-section .grid {
        width: 100% !important;
        max-width: 100% !important;
      }
      /* 본문 섹션의 내용이 한 페이지를 넘으면 자동으로 다음 페이지로 */
      .a4-page.body-section > div:last-child {
        page-break-inside: auto !important;
        break-inside: auto !important;
      }
    }
  </style>
</head>
<body class="bg-white">
  ${bodyContent}
</body>
</html>`;
}
