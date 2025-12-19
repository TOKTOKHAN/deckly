// 제안서 생성 프롬프트 템플릿
export const PROPOSAL_TEMPLATE = `
당신은 'TOKTOKHAN.DEV'의 전문 제안서 디자이너입니다. 입력된 회의록/메모를 분석하여 A4 규격의 HTML 제안서를 생성하세요.

## [필수] 출력 형식: 완전한 HTML 파일

다음 구조로 완전한 HTML 파일을 출력하세요:

<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>프로젝트 제안서</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@3/dist/tailwind.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
  <style>
    * { font-family: 'Pretendard', sans-serif; }
    .a4-page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      margin: 0 auto;
      background: white;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      page-break-after: always;
    }
    @media print {
      @page { margin: 0; size: A4; }
      body { margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .a4-page { width: 210mm; height: 297mm !important; overflow: hidden !important; page-break-after: always; margin: 0; border: none; box-shadow: none; }
      .no-print { display: none !important; }
    }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { /* 여기에 Primary Color 정의 */ },
            base: { /* 여기에 Base Color 정의 */ }
          }
        }
      }
    }
  </script>
</head>
<body>
  <!-- 여기에 제안서 내용 -->
  <button onclick="window.print()" class="fixed bottom-4 right-4 no-print bg-primary-500 text-white px-6 py-3 rounded-lg shadow-lg">PDF 저장</button>
</body>
</html>

## 컬러 시스템

프로젝트 특성에 맞는 2가지 컬러를 선택하세요:
- Primary Color: 브랜드 핵심 가치를 나타내는 강조색 (예: 신뢰=파란색 #3B82F6, 혁신=보라색 #8B5CF6)
- Base Color: Primary와 조화되는 어두운 배경색 (예: Dark Navy #1E293B, Charcoal #374151)

선택한 컬러를 Tailwind config의 primary/base에 정의하고, 전체 디자인에 일관되게 적용하세요.

## 내용 구조

다음 6개 섹션을 포함하세요:

0. 표지: 프로젝트 제목, 슬로건, TOKTOKHAN.DEV, 작성일
1. 프로젝트 개요: 목적, 문제점, 타겟 니즈
2. 요구사항 이해: 요구사항 리스트, 리스크, 핵심 기준
3. 제안하는 방향성: 핵심 전략 3가지, 기능 구조도(Box Diagram), MVP 범위
4. 예상 일정 및 추진 방식: 단계별 일정표(Bar Chart), 투입 인력, 협업 방식
5. 기대효과 & 결론: 기대효과, 당사 강점, 클로징 메시지

## 디자인 가이드

- 회사명: 'TOKTOKHAN.DEV' (대문자)
- 폰트: Pretendard (이미 head에 포함됨)
- 언어: 본문은 한국어, 타이틀은 영문 가능
- 레이아웃: A4(210mm x 297mm), 각 섹션은 .a4-page 클래스 사용
- 이미지: <img> 태그 사용 금지, CSS/Tailwind로 다이어그램 구현

## 중요 사항

- 내용이 부족하면 전문 지식으로 보완하세요
- 완전한 HTML 코드만 출력하세요 (설명 없이)
- PDF 저장 버튼은 우측 하단 고정
- 인쇄 시 여백 없이 A4 크기로 출력되도록 설정

---

다음 회의록/메모를 분석하여 위 요구사항에 맞는 HTML 제안서를 생성하세요:

회의록/메모 내용:
`;

// 프롬프트 생성 함수
export function createProposalPrompt(data: {
  meetingNotes?: string; // 회의록/메모
  title?: string;
  client?: string;
  date?: string;
  projectOverview?: string;
  budget?: string;
  period?: string;
  requirements?: string;
}): string {
  let meetingContent = '';

  // 회의록/메모가 있으면 우선 사용
  if (data.meetingNotes) {
    meetingContent = data.meetingNotes;
  } else {
    // 회의록이 없으면 다른 입력값으로 구성
    const parts: string[] = [];

    if (data.title) parts.push(`프로젝트 제목: ${data.title}`);
    if (data.client) parts.push(`고객사: ${data.client}`);
    if (data.projectOverview) parts.push(`프로젝트 개요: ${data.projectOverview}`);
    if (data.requirements) parts.push(`요구사항: ${data.requirements}`);
    if (data.budget) parts.push(`예산: ${data.budget}`);
    if (data.period) parts.push(`기간: ${data.period}`);

    meetingContent = parts.join('\n');
  }

  // 기본 템플릿 + 회의록 내용
  return `${PROPOSAL_TEMPLATE}\n${meetingContent}`;
}
