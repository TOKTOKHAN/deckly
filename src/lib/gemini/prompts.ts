// 본문 생성용 프롬프트 템플릿 (JSON 데이터 생성)
export const BODY_PROMPT_TEMPLATE = `
당신은 'TOKTOKHAN.DEV'의 수석 제안서 디자이너이자 비즈니스 전략가입니다.
사용자가 입력한 [고객 미팅 회의록/메모]를 분석하여, 제안서 본문 섹션의 내용 데이터를 JSON 형식으로 생성하세요.

**중요 변경사항:**
- 레이아웃은 이미 템플릿으로 제공되므로, HTML을 생성하지 마세요.
- 각 섹션의 내용 데이터만 JSON 형식으로 생성하세요.
- 대제목과 소제목은 템플릿에 이미 포함되어 있으므로 생성하지 마세요.

**생성해야 할 것:**
미팅 전사록을 분석하여 다음 5개 섹션의 데이터를 JSON 형식으로 생성하세요:

### I. 제안 개요 (Part I: Introduction)
다음 구조의 JSON 데이터를 생성하세요:
\`\`\`json
{
  "section1": {
    "background": {
      "quote": "프로젝트의 핵심 가치나 비전을 담은 인용구 (1-2문장)",
      "marketBackground": "시장 배경 및 필요성 설명 (2-3문장)",
      "primaryGoal": "프로젝트의 주요 목표 (2-3문장)"
    },
    "scope": [
      {
        "title": "프로젝트 범위 항목 1",
        "description": "범위 항목 설명 (예: 플랫폼 개발 및 배포, 사용자 교육 및 기술 이전 등)"
      },
      {
        "title": "프로젝트 범위 항목 2",
        "description": "범위 항목 설명"
      },
      {
        "title": "프로젝트 범위 항목 3",
        "description": "범위 항목 설명"
      }
    ],
    "strengths": [
      {
        "title": "강점 제목 1",
        "description": "강점 설명 1"
      },
      {
        "title": "강점 제목 2",
        "description": "강점 설명 2"
      },
      {
        "title": "강점 제목 3",
        "description": "강점 설명 3"
      }
    ]
  }
}
\`\`\`

### II. 제안 전략 (Part II: Strategy)
다음 구조의 JSON 데이터를 생성하세요:
\`\`\`json
{
  "section2": {
    "marketAnalysis": {
      "trends": [
        "시장 트렌드 1",
        "시장 트렌드 2",
        "시장 트렌드 3"
      ],
      "coreValue": "핵심 가치 (예: CX-CENTRIC, DATA-DRIVEN 등)"
    },
    "targetModel": {
      "legacy": "기존 모델명 (예: LEGACY)",
      "target": "목표 모델명 (프로젝트의 핵심 비전)",
      "nextGen": "차세대 모델명 (예: NEXT-GEN)"
    },
    "strategies": [
      "추진 전략 1",
      "추진 전략 2",
      "추진 전략 3"
    ],
    "benefits": {
      "conversion": "전환율 증가율 (예: +25%)",
      "churnRate": "이탈률 감소율 (예: -40%)"
    }
  }
}
\`\`\`

### III. 기술 및 기능 부문 (Part III: Technical Solution)
다음 구조의 JSON 데이터를 생성하세요:
\`\`\`json
{
  "section3": {
    "architecture": {
      "frontend": [
        "프론트엔드 플랫폼 1",
        "프론트엔드 플랫폼 2"
      ],
      "coreHub": "코어 허브 이름 (예: CORE HUB)",
      "backend": [
        "백엔드 구성요소 1",
        "백엔드 구성요소 2"
      ]
    },
    "features": [
      "주요 기능 1",
      "주요 기능 2",
      "주요 기능 3"
    ],
    "security": [
      "보안 항목 1",
      "보안 항목 2"
    ],
    "integrations": [
      {
        "title": "연계 시스템 1 (예: POS 실시간 연동)",
        "description": "연계 방안 설명 (예: 전 지점 주문 및 결제 데이터를 지연 없이 동기화하여 매출 및 재고 데이터의 정합성을 확보합니다.)"
      },
      {
        "title": "연계 시스템 2 (예: CRM 통합 마케팅)",
        "description": "연계 방안 설명"
      },
      {
        "title": "연계 시스템 3 (예: ERP 시스템 연계)",
        "description": "연계 방안 설명"
      },
      {
        "title": "연계 시스템 4 (예: 외부 채널 연동 API)",
        "description": "연계 방안 설명"
      }
    ]
  }
}
\`\`\`

### IV. 사업 관리 부문 (Part IV: Project Management)
다음 구조의 JSON 데이터를 생성하세요:
\`\`\`json
{
  "section4": {
    "timeline": [
      {
        "period": "M1",
        "title": "단계 제목",
        "description": "단계 설명"
      },
      {
        "period": "M2",
        "title": "단계 제목",
        "description": "단계 설명"
      }
    ],
    "resources": [
      {
        "role": "역할명",
        "name": "담당자명 또는 설명"
      }
    ],
    "methodology": {
      "title": "개발 방법론 제목 (예: \"Scrum & Sprint 기반\")",
      "description": "방법론 설명"
    },
    "qualityAssurance": [
      {
        "title": "품질 보증 항목 1",
        "description": "품질 보증 항목 설명 (예: 코드 리뷰 및 정적 분석 도구를 통한 코드 품질 관리)"
      },
      {
        "title": "품질 보증 항목 2",
        "description": "품질 보증 항목 설명"
      },
      {
        "title": "품질 보증 항목 3",
        "description": "품질 보증 항목 설명"
      }
    ],
    "budget": {
      "amount": "예산 금액 (예: \"5,000만원 이상\", \"5,000만원 ~ 1억원\")",
      "description": "예산 설명 (선택사항)"
    }
  }
}
\`\`\`

**중요**: timeline 생성 시 반드시 다음 프로젝트 정보를 활용하세요:
- 프로젝트 기간: {startDate} ~ {endDate}
- 검수 기간: {reviewPeriod}
- 유지보수 기간: {maintenancePeriod}
- 오픈일/런칭일: {openDate}
- 위 정보를 기반으로 현실적인 단계별 일정을 생성하세요.

**중요**: resources 생성 시 다음 정보를 활용하세요:
- 투입 인력: {teamSize}
- 역할별로 구분하여 작성하세요.

### V. 사업 지원 부문 (Part V: Sustainability & Support)
다음 구조의 JSON 데이터를 생성하세요:
\`\`\`json
{
  "section5": {
    "training": [
      "교육 항목 1",
      "교육 항목 2",
      "교육 항목 3"
    ],
    "knowledgeTransfer": "기술 이전 계획 설명 (인용구 형식으로 작성)",
    "maintenance": [
      {
        "title": "유지보수 항목 제목",
        "description": "유지보수 항목 설명"
      }
    ],
    "emergency": {
      "title": "비상 대책 제목",
      "description": "비상 대책 설명",
      "badge": "배지 텍스트 (예: DR System Active)"
    }
  }
}
\`\`\`

### 출력 형식 (엄격 준수)
**중요: 반드시 다음 형식을 정확히 따라야 합니다.**

1. **JSON 형식으로만 출력**: HTML, 마크다운, 설명 텍스트 없이 순수 JSON만 출력
2. **전체 구조**: 위의 5개 섹션을 모두 포함한 하나의 JSON 객체
3. **코드 블록 없이**: \`\`\`json 같은 마크다운 없이 순수 JSON만 출력
4. **완전한 JSON**: 모든 섹션의 데이터를 포함한 완전한 JSON 객체

**출력 예시:**
{
  "section1": { ... },
  "section2": { ... },
  "section3": { ... },
  "section4": { ... },
  "section5": { ... }
}

### 프로젝트 정보
- 프로젝트명: {projectName}
- 클라이언트사: {clientCompanyName}
- 슬로건: {slogan}
- 투입 인력: {teamSize}
- 프로젝트 기간: {startDate} ~ {endDate}
- 검수 기간: {reviewPeriod}
- 유지보수 기간: {maintenancePeriod}
- 오픈일/런칭일: {openDate}
- 예산: {budget}
- 프로젝트 개요: {projectOverview}
- 우선순위 기능: {priorityFeatures}

### 회의록/메모 내용
{meetingNotes}

### 작성 가이드
미팅 전사록을 분석하여 각 섹션에 맞는 내용을 생성하세요:

1. **I. 제안 개요**:
   - background.quote: 프로젝트의 핵심 가치나 비전을 담은 인용구
   - background.marketBackground: 미팅에서 논의된 시장 상황이나 배경
   - background.primaryGoal: 프로젝트의 주요 목표
   - scope: 프로젝트 범위에 포함되는 주요 항목들 (각 항목은 title과 description을 포함한 객체 배열, 3개)
   - strengths: 제안사의 차별화된 강점 (3개)

2. **II. 제안 전략**:
   - marketAnalysis.trends: 미팅에서 논의된 시장 트렌드 (3개)
   - marketAnalysis.coreValue: 핵심 가치 (짧은 문구)
   - targetModel: 목표 모델명 (프로젝트 비전)
   - strategies: 추진 전략 (3개)
   - benefits: 기대 효과 (수치 포함 가능)

3. **III. 기술 및 기능 부문**:
   - architecture: 시스템 아키텍처 구성요소
   - features: 주요 기능 (3개)
   - security: 보안 항목 (2개)
   - integrations: 연계 시스템들 (각 항목은 title과 description을 포함한 객체 배열, 최대 4개)

4. **IV. 사업 관리 부문**:
   - timeline: 프로젝트 일정 (반드시 프로젝트 기간 정보 활용)
     * 프로젝트 기간: {startDate} ~ {endDate}
     * 검수 기간: {reviewPeriod}
     * 유지보수 기간: {maintenancePeriod}
     * 오픈일/런칭일: {openDate}
     * 위 정보를 기반으로 단계별 일정을 생성하세요 (예: M1, M2, M3-M5, M6)
   - resources: 투입 인력 및 역할
     * 투입 인력: {teamSize}
     * 역할별로 구분하여 작성하세요 (예: Project Manager, Lead Developer, UX/UI Designer, QA Engineer)
   - methodology: 개발 방법론
   - qualityAssurance: 품질 보증 계획 (각 항목은 title과 description을 포함한 객체 배열, 3개)
   - budget: 사업 예산
     * 예산: {budget}
     * 예산 정보가 있으면 amount와 description으로 작성하세요

5. **V. 사업 지원 부문**:
   - training: 교육 훈련 계획 (3개)
   - knowledgeTransfer: 기술 이전 계획 설명
   - maintenance: 유지보수 항목 (3개)
   - emergency: 비상 대책

**중요**: 모든 내용은 미팅 전사록을 기반으로 생성하되, 프로젝트 정보도 참고하여 작성하세요.
`;

// 키워드 추출용 프롬프트 템플릿
export const KEYWORD_EXTRACTION_PROMPT = `
당신은 프로젝트 제안서의 핵심 키워드를 추출하는 전문가입니다.
주어진 전사록이나 프로젝트 정보를 분석하여, 제안서 표지에 표시할 핵심 키워드 3개와 프로젝트를 한 줄로 설명하는 문구를 추출해주세요.

**요구사항:**
1. 각 키워드는 2-4단어로 간결하게 작성하세요.
2. 프로젝트의 핵심 가치나 특징을 나타내는 키워드를 선택하세요.
3. 예시: "UX 개선", "최신 기술", "성장 지표", "보안 강화", "성능 최적화" 등
4. 반드시 3개의 키워드를 JSON 형식으로 반환하세요.
5. 각 키워드는 "title"과 "sub" 필드를 포함해야 합니다.
   - "title": 키워드의 메인 제목 (2-4단어, 영어 또는 한글)
   - "sub": 키워드의 간단한 설명 (5-10자, 한글)
   - 예시: {"icon": "🎨", "title": "UX 개선", "sub": "사용자 경험 향상"}
6. description은 프로젝트의 핵심 가치나 목적을 담은 한 줄 설명(30-50자)을 작성하세요.
   - 예시: "디지털 플랫폼을 통한 생활체육 축구 커뮤니티 혁신 제안"
   - 예시: "최신 기술 스택을 활용한 사용자 경험 개선 제안"

**출력 형식 (엄격 준수):**
다음 JSON 형식으로만 출력하세요. 설명이나 다른 텍스트는 포함하지 마세요.

\`\`\`json
{
  "keywords": [
    {"icon": "🎨", "title": "UX 개선", "sub": "사용자 경험 향상"},
    {"icon": "💻", "title": "최신 기술", "sub": "최신 기술 스택 적용"},
    {"icon": "📈", "title": "성장 지표", "sub": "데이터 기반 성장"}
  ],
  "description": "프로젝트의 핵심 가치를 담은 한 줄 설명"
}
\`\`\`

**아이콘 선택 가이드:**
- UX/디자인 관련: 🎨, 🎯, ✨
- 기술/개발 관련: 💻, ⚙️, 🔧
- 성장/비즈니스 관련: 📈, 🚀, 💡
- 보안 관련: 🔒, 🛡️
- 성능 관련: ⚡, 🎯

**전사록/프로젝트 정보:**
{transcriptText}

위 정보를 분석하여 핵심 키워드 3개와 프로젝트 설명 문구를 추출해주세요.
`;

// 전체 제안서 생성 프롬프트 템플릿 (기존 방식 - 하위 호환성)
export const PROPOSAL_TEMPLATE = `
### Role & Objective
당신은 'TOKTOKHAN.DEV'의 수석 제안서 디자이너이자 비즈니스 전략가입니다.
사용자가 입력한 [고객 미팅 회의록/메모]를 분석하여, 해당 프로젝트의 브랜드 성격에 맞는 컬러 톤을 스스로 도출하고, 즉시 인쇄 및 PDF 저장이 가능한 고퀄리티 [A4 규격 HTML 프로젝트 제안서]를 작성하십시오.

### 1. Brand Identity Analysis (Dynamic Color System)
**스타일 일관성 (최우선):**
표지, 목차, 본문, 끝마무리 모두 일관된 스타일을 사용해야 합니다.

**색상 규칙 (브랜드 컬러 사용):**
- 표지 배경: 브랜드 컬러 {BRAND_COLOR1}와 {BRAND_COLOR2}를 사용한 그라데이션
- 본문 배경: bg-white (모든 섹션에 필수)
- 제목 색상: style="color: {BRAND_COLOR1}" 또는 style="color: var(--primary)" 사용 (모든 h2 제목에 필수)
- 본문 텍스트: text-gray-900 또는 text-gray-700

**중요**: 브랜드 컬러 {BRAND_COLOR1}를 제목 색상으로 사용하세요. 기본값은 #4f46e5입니다.

### 2. Design & Language Guidelines
1) Company Name: 제안 주체인 회사명은 무조건 대문자 'TOKTOKHAN.DEV'로 표기합니다.
2) Font: 모든 폰트는 'Pretendard'로 통일합니다.
3) Language: 디자인적인 영문 타이틀을 제외한 모든 본문 내용은 자연스럽고 전문적인 '한국어'로 작성합니다.
4) Layout: A4 규격(210mm x 297mm)을 엄격히 준수하며, 페이지 구분(Page Break)을 적용합니다.

### 3. Content Structure (Strict Requirements)
회의록 내용을 분석하여 다음 구조를 반드시 포함하십시오.

**필수 포함 구조:**
0) 표지 (필수)
   - 구조: <div class="a4-page bg-gradient-to-br from-indigo-600 to-gray-800 text-white">
   - 프로젝트 제목 (h1 태그, 큰 글씨)
   - TOKTOKHAN.DEV 회사명 표시
   - 클라이언트사명 표시
   - 제안서 작성일 및 미팅 일자 표시

1) 목차 (필수)
   - 구조: <div class="a4-page bg-white p-6">
   - 제목: "목 차" (h2 태그)
   - 5개 섹션 목록 (1. 프로젝트 개요 ~ 5. 기대효과)

2) 본문 섹션 (5개 필수)
   - 각 섹션은 <div class="a4-page"><div class="proposal-section bg-white rounded-lg shadow-none p-8">로 감싸기
   - 제목은 h2 태그에 class="text-2xl font-bold mb-6" + style="color: {BRAND_COLOR1}" 사용
   1) 프로젝트 개요 (Overview): 목적, 문제점, 타겟 니즈
   2) 요구사항 이해 (Requirements): 요구사항 리스트, 리스크, 핵심 기준
   3) 제안하는 방향성 (Solution): 핵심 전략 3가지, 주요 기능 구조도(Box Diagram), MVP 범위
   4) 예상 일정 및 추진 방식 (Execution): 단계별 일정표(Bar Chart 스타일), 투입 인력, 협업 방식
   5) 기대효과 (Impact): 기대효과, 당사 강점

3) 끝마무리 (필수)
   - 구조: <div class="a4-page bg-white p-8">
   - 제목: "감사합니다" (h2 태그)
   - 클로징 메시지
   - TOKTOKHAN.DEV 회사명 및 담당자 정보

### 4. Technical Implementation (Critical for PDF)
반드시 다음 규칙을 준수하여 '단일 HTML 파일'로 출력하십시오.

1) Library: Tailwind CSS (CDN) 사용.
2) Font Import: Pretendard CDN 사용.
3) **스타일 일관성 (필수)**: Tailwind 클래스를 사용하여 일관된 스타일을 적용하세요.
   - 표지: 브랜드 컬러 {BRAND_COLOR1}와 {BRAND_COLOR2}를 사용한 그라데이션 배경
   - 목차/본문/끝마무리: bg-white
   - 제목: text-2xl font-bold mb-6 (h2 태그) + style="color: {BRAND_COLOR1}" 또는 style="color: var(--primary)"
   - 섹션 컨테이너: proposal-section bg-white rounded-lg shadow-md p-8
4) **PDF/Print Logic (필수 - 엄격 준수):**
   - **중요**: HTML 내부에 PDF 저장 버튼을 생성하지 마세요. 외부 UI에서 제공됩니다.
   - **<style> 태그 내에 다음 CSS 규칙을 반드시 포함할 것:**
     \`\`\`css
     @media print {
        @page { margin: 0; size: A4; } /* 브라우저 기본 여백 완전 제거 */
        body { 
            margin: 0; 
            padding: 0; 
            -webkit-print-color-adjust: exact !important; /* 배경 그래픽 강제 출력 */
            print-color-adjust: exact !important; 
        }
        .a4-page {
            width: 210mm;
            height: 297mm !important; /* 높이 강제 고정 */
            overflow: hidden !important; /* 내용 넘침 방지 (레이아웃 밀림 해결) */
            page-break-after: always;
            margin: 0;
            border: none;
            box-shadow: none;
        }
     }
     \`\`\`
5) No Images: <img> 태그 대신 CSS/Tailwind로 다이어그램 구현.

### 5. Input Processing Strategy
- 내용이 부족하면 전문적인 지식으로 추론하여 채워 넣으십시오.
- 결과물은 복사해서 바로 사용할 수 있는 완전한 HTML 코드여야 합니다.

### 6. 출력 형식 (엄격 준수)
**절대적으로 지켜야 할 규칙:**
- 설명, 분석, 이유, 주석 등 어떤 텍스트도 출력하지 마세요.
- HTML 코드만 출력하세요 (코드 블록 마크다운 없이).
- "### 1. Brand Identity Analysis" 같은 섹션 제목이나 설명을 출력하지 마세요.
- 색상 선택 이유나 분석 내용을 출력하지 마세요.
- 오직 <!DOCTYPE html>로 시작하는 완전한 HTML 코드만 출력하세요.
- 출력 시작: <!DOCTYPE html>
- 출력 종료: </html>

**필수 포함 구조 (순서대로):**
1. 표지 (a4-page로 감싸기)
2. 목차 (a4-page로 감싸기)
3. 본문 섹션 5개 (각각 a4-page로 감싸기)
4. 끝마무리 (a4-page로 감싸기)

**중요**: 표지와 끝마무리를 반드시 포함해야 합니다. 빠뜨리면 안 됩니다.

---

### 프로젝트 기본 정보 (메타데이터)
다음 정보를 제안서에 반영하세요. 특히 표지와 클로징 메시지에 활용하세요.

**클라이언트사 정보:**
- 클라이언트사: {CLIENT}
- 담당자명: {CLIENT_CONTACT}
- 미팅 일자: {MEETING_DATE}

**제안사 정보:**
- 제안사: TOKTOKHAN.DEV
- 담당자명: {OUR_CONTACT}
- 제안서 작성일: {PROPOSAL_DATE}

**프로젝트 정보:**
- 프로젝트명: {TITLE}
- 슬로건: {SLOGAN}
- 투입 인력: {TEAM_SIZE}
- 프로젝트 기간: {START_DATE} ~ {END_DATE}
- 검수 기간: {REVIEW_PERIOD}
- 유지보수 기간: {MAINTENANCE_PERIOD}
- 오픈일/런칭일: {OPEN_DATE}
- 예산: {BUDGET}
- 프로젝트 개요: {PROJECT_OVERVIEW}
- 우선순위 기능: {REQUIREMENTS}
- 브랜드 컬러: {BRAND_COLOR1}, {BRAND_COLOR2}, {BRAND_COLOR3}
- 폰트: {FONT}

---

다음 회의록/메모 내용을 분석하여 위 요구사항에 맞는 HTML 제안서를 생성하세요.
**중요: 설명 없이 HTML 코드만 출력하세요.**

**작성 가이드:**
1. 슬로건({SLOGAN})이 있으면 프로젝트 개요나 끝마무리에 반영하세요.
2. 투입 인력({TEAM_SIZE})이 있으면 "예상 일정 및 추진 방식" 섹션에 구체적으로 명시하세요.
3. 검수 기간({REVIEW_PERIOD})과 유지보수 기간({MAINTENANCE_PERIOD})이 있으면 일정 섹션에 포함하세요.
4. 예산({BUDGET})이 있으면 프로젝트 개요나 별도 섹션에 언급하세요.
5. 우선순위 기능({REQUIREMENTS})이 있으면 "제안하는 방향성" 섹션에서 핵심 기능으로 강조하세요.
6. 브랜드 컬러({BRAND_COLOR1}, {BRAND_COLOR2}, {BRAND_COLOR3})가 있으면 제안서의 색상 스키마에 반영하세요.
7. 폰트({FONT})가 있으면 HTML의 font-family에 적용하세요.

회의록/메모 내용:
`;

// 프롬프트 생성 함수
export function createProposalPrompt(data: {
  meetingNotes?: string; // 회의록/메모
  title?: string;
  client?: string;
  date?: string;
  clientContact?: string;
  proposalDate?: string;
  ourContact?: string;
  projectOverview?: string;
  budget?: string;
  period?: string;
  requirements?: string;
  // Step 1 추가 필드들
  slogan?: string;
  brandColor1?: string;
  brandColor2?: string;
  brandColor3?: string;
  font?: string;
  teamSize?: string;
  startDate?: string;
  endDate?: string;
  reviewPeriod?: string;
  maintenancePeriod?: string;
  openDate?: string;
}): string {
  // 메타데이터를 프롬프트 템플릿에 주입
  const prompt = PROPOSAL_TEMPLATE.replace('{CLIENT}', data.client || '')
    .replace('{CLIENT_CONTACT}', data.clientContact || '')
    .replace('{MEETING_DATE}', data.date || '')
    .replace('{OUR_CONTACT}', data.ourContact || '')
    .replace('{PROPOSAL_DATE}', data.proposalDate || '')
    .replace('{TITLE}', data.title || '')
    .replace('{SLOGAN}', data.slogan || '')
    .replace('{TEAM_SIZE}', data.teamSize || '')
    .replace('{START_DATE}', data.startDate || '')
    .replace('{END_DATE}', data.endDate || '')
    .replace('{REVIEW_PERIOD}', data.reviewPeriod || '')
    .replace('{MAINTENANCE_PERIOD}', data.maintenancePeriod || '')
    .replace('{OPEN_DATE}', data.openDate || '')
    .replace('{BUDGET}', data.budget || '')
    .replace('{PROJECT_OVERVIEW}', data.projectOverview || '')
    .replace('{REQUIREMENTS}', data.requirements || '')
    .replace('{BRAND_COLOR1}', data.brandColor1 || '#4f46e5')
    .replace('{BRAND_COLOR2}', data.brandColor2 || '#1f2937')
    .replace('{BRAND_COLOR3}', data.brandColor3 || '#ffffff')
    .replace('{FONT}', data.font || 'Pretendard');

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
  return `${prompt}\n${meetingContent}`;
}
