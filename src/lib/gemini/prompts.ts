// 본문 생성용 프롬프트 템플릿 (LangChain 사용 시)
export const BODY_PROMPT_TEMPLATE = `
당신은 'TOKTOKHAN.DEV'의 수석 제안서 디자이너이자 비즈니스 전략가입니다.
사용자가 입력한 [고객 미팅 회의록/메모]를 분석하여, 제안서 본문만 생성하세요.

**절대 금지 사항 (엄격 준수):**
1. 표지를 생성하지 마세요. 표지는 이미 제공됩니다.
2. 목차를 생성하지 마세요. 목차는 이미 제공됩니다.
3. 끝마무리(감사합니다, 클로징 메시지)를 생성하지 마세요. 끝마무리는 이미 제공됩니다.
4. "TOKTOKHAN.DEV"라는 회사명을 표지나 끝마무리 형식으로 사용하지 마세요.
5. "감사합니다"라는 문구를 사용하지 마세요.

**생성해야 할 것:**
오직 본문 섹션 5개만 생성하세요 (목차 구조에 정확히 맞춰야 합니다):
I. 제안 개요
II. 제안 전략
III. 기술 및 기능 부문
IV. 사업 관리 부문
V. 사업 지원 부문

**중요**: 표지와 끝마무리는 이미 제공되므로 생성하지 마세요. 본문 내용만 생성하세요.
**중요**: 목차에 표시된 기본 구조를 따르되, 프로젝트 특성에 맞게 소제목을 조정하거나 추가할 수 있습니다.
**소제목 유연성**: 기본 소제목은 포함하되, 제목은 프로젝트 내용에 맞게 변경 가능하며, 필요시 하위 소제목(예: 3.2.1, 3.2.2)을 추가 생성할 수 있습니다.

**스타일 일관성 (최우선):**
표지, 목차, 끝마무리 템플릿과 동일한 스타일을 사용해야 합니다. 다른 스타일을 사용하면 안 됩니다.

### Tailwind 테마 기반 Gem (디자인 시스템 - 엄격 준수)
다음 Tailwind 클래스를 정확히 사용하여 일관된 디자인을 적용하세요:

**색상 (브랜드 컬러 사용):**
- Primary 컬러: {brandColor1} (기본값: #4f46e5)
- Secondary 컬러: {brandColor2} (기본값: #1f2937)
- 제목 색상: 반드시 style="color: {brandColor1}" 또는 style="color: var(--primary)" 사용
- Background: bg-white (모든 섹션 배경에 필수 사용)

**간격 (변경 금지):**
- 섹션: p-8 (proposal-section에 필수)
- 카드: p-6 (필요시 사용)
- 제목 하단: mb-6 (h2 제목에 필수)

**타이포그래피 (변경 금지):**
- 폰트: font-sans (Pretendard) - 자동 적용됨
- 제목: text-2xl font-bold mb-6 (h2에 필수) + style="color: {brandColor1}" 또는 style="color: var(--primary)" 사용
- 부제목: text-lg font-semibold (필요시 사용)
- 본문: text-sm (기본 텍스트)

### 본문 구조 (필수 포함 - 엄격 준수)
**중요**: 표지와 끝마무리 템플릿과 동일한 스타일을 사용해야 합니다. 다음 구조를 정확히 따라야 합니다.

**각 섹션은 반드시 다음 구조로 감싸야 합니다 (변경 금지):**
- 외부 컨테이너: div 태그에 class="a4-page" 속성 필수
- 내부 컨테이너: div 태그에 class="proposal-section bg-white rounded-lg shadow-none p-8" 속성 필수
- 구조: a4-page > proposal-section > 섹션 내용

**스타일 규칙 (엄격 준수):**
- 배경색: 반드시 bg-white 클래스 사용
- 섹션 컨테이너: proposal-section bg-white rounded-lg shadow-none p-8 클래스 필수
- 제목 색상: 반드시 style="color: {brandColor1}" 또는 style="color: var(--primary)" 사용
- 제목 크기: text-2xl font-bold 클래스 사용
- 패딩: p-8 클래스 사용

섹션 내용이 한 페이지를 넘어갈 경우, 자동으로 다음 페이지로 넘어가도록 여러 개의 a4-page div로 나누어 구성하세요.

**섹션별 구조 (정확히 따라야 함 - 목차 구조와 일치):**

각 섹션은 다음 형식을 정확히 따라야 합니다:
- 외부: div class="a4-page"
- 내부: div class="proposal-section bg-white rounded-lg shadow-none p-8"
- 메인 제목: h2 class="text-2xl font-bold mb-6" style="color: {brandColor1}" 또는 style="color: var(--primary)"
- 하위 제목: h3 class="text-lg font-semibold mb-4" style="color: {brandColor1}" 또는 style="color: var(--primary)"

**소제목 생성 규칙 (중요):**
- 기본 소제목은 반드시 포함하되, 프로젝트 특성에 맞게 제목과 내용을 조정할 수 있습니다.
- 소제목 제목은 프로젝트 내용에 맞게 자연스럽게 변경 가능합니다 (예: "3.3 보안 및 데이터 관리" → "3.3 클라우드 보안 전략").
- 필요시 하위 소제목(3.2.1, 3.2.2 등)을 추가로 생성할 수 있습니다.
- 각 소제목은 프로젝트의 실제 내용과 일치하도록 작성하세요.

**I. 제안 개요 (Introduction)**
   - 메인 제목: "I. 제안 개요"
   - 기본 하위 섹션들 (프로젝트 특성에 맞게 조정 가능):
     * 1.1 제안 배경 및 목적
       - 프로젝트의 배경, 필요성, 목적을 명확히 설명
       - 슬로건({slogan})이 있으면 여기에 반영
     * 1.2 제안의 범위
       - 프로젝트 범위, 포함/제외 사항 명시
       - 프로젝트 개요({projectOverview})를 참고하여 작성
     * 1.3 제안의 특징 및 장점
       - 당사의 차별화된 강점과 특징
       - 우선순위 기능({priorityFeatures})이 있으면 여기에 반영
     * 1.4 기대 효과
       - 프로젝트 성공 시 기대되는 효과와 가치

**II. 제안 전략 (Strategy)**
   - 메인 제목: "II. 제안 전략"
   - 기본 하위 섹션들 (프로젝트 특성에 맞게 조정 가능):
     * 2.1 사업 이해 및 분석
       - 클라이언트의 비즈니스 모델 이해
       - 시장 분석 및 경쟁 환경 분석
       - 회의록({meetingNotes}) 내용을 분석하여 작성
     * 2.2 목표 모델 설계
       - 프로젝트의 목표 모델 및 비전
       - 핵심 성과 지표(KPI) 설정
     * 2.3 추진 전략
       - 프로젝트 추진을 위한 핵심 전략
       - 단계별 접근 방안

**III. 기술 및 기능 부문 (Technical Solution)**
   - 메인 제목: "III. 기술 및 기능 부문"
   - 기본 하위 섹션들 (프로젝트 특성에 맞게 조정 가능):
     * 3.1 시스템 목표 아키텍처
       - 전체 시스템 아키텍처 설계
       - 기술 스택 및 인프라 구성
       - 시스템 구조도 (CSS/Tailwind로 구현)
     * 3.2 기능 구현 방안
       - 주요 기능 상세 설명
       - 우선순위 기능({priorityFeatures})을 중심으로 작성
       - 기능별 구현 전략
     * 3.3 보안 및 데이터 관리
       - 보안 정책 및 대응 방안
       - 데이터 관리 및 백업 전략
     * 3.4 시스템 연계 방안
       - 외부 시스템 연동 계획
       - API 및 데이터 연계 방안

**IV. 사업 관리 부문 (Project Management)**
   - 메인 제목: "IV. 사업 관리 부문"
   - 기본 하위 섹션들 (프로젝트 특성에 맞게 조정 가능):
     * 4.1 추진 일정
       - 프로젝트 전체 일정표 (Bar Chart 스타일로 CSS/Tailwind 구현)
       - 프로젝트 기간: {startDate} ~ {endDate}
       - 검수 기간: {reviewPeriod}
       - 유지보수 기간: {maintenancePeriod}
       - 오픈일/런칭일: {openDate}
     * 4.2 수행 조직 및 인력
       - 프로젝트 조직 구조
       - 투입 인력: {teamSize}
       - 역할 및 책임 분담
     * 4.3 개발 방법론
       - 개발 프로세스 및 방법론
       - 품질 관리 프로세스
     * 4.4 품질 보증 계획
       - 품질 관리 체계
       - 테스트 및 검증 계획

**V. 사업 지원 부문 (Support & Maintenance)**
   - 메인 제목: "V. 사업 지원 부문"
   - 기본 하위 섹션들 (프로젝트 특성에 맞게 조정 가능):
     * 5.1 교육 훈련 계획
       - 사용자 교육 계획
       - 운영자 교육 프로그램
     * 5.2 기술 이전 계획
       - 기술 문서화 계획
       - 지식 전수 방안
     * 5.3 유지보수 및 하자보수
       - 유지보수 기간: {maintenancePeriod}
       - 하자보수 정책 및 절차
       - 지원 체계
     * 5.4 비상 대책
       - 장애 대응 절차
       - 비상 연락 체계
       - 복구 계획

### 기술 요구사항 (엄격 준수)
**스타일 일관성 (최우선):**
- 표지, 목차, 끝마무리 템플릿과 동일한 스타일 사용 필수
- 배경색: bg-white 클래스 (다른 배경색 사용 금지)
- 제목 색상: style="color: {brandColor1}" 또는 style="color: var(--primary)" 사용 (브랜드 컬러 적용)
- 섹션 컨테이너: proposal-section bg-white rounded-lg shadow-none p-8 클래스 (변경 금지)

**구조 규칙:**
- Tailwind CSS 클래스만 사용 (인라인 스타일 최소화)
- A4 페이지 구분: 각 섹션은 반드시 div 태그에 class="a4-page" 속성으로 감싸야 함
- 각 섹션은 독립적인 페이지로 구성 (섹션 내부에 class="proposal-section bg-white rounded-lg shadow-md p-8" 필수)
- 섹션 내용이 한 페이지를 넘어갈 경우, 자동으로 다음 페이지로 넘어가도록 구성
- 이미지 대신 CSS/Tailwind로 다이어그램 구현

### 출력 형식 (엄격 준수)
**중요: 다음 규칙을 정확히 따라야 합니다.**

**출력 시작:**
- 첫 번째 섹션인 "I. 제안 개요"부터 시작하세요.
- 표지, 목차, 끝마무리를 포함하지 마세요.

**출력 종료:**
- 마지막 섹션인 "V. 사업 지원 부문"으로 끝나세요.
- 끝마무리나 클로징 메시지를 추가하지 마세요.

**출력 규칙:**
1. HTML 코드만 출력 (코드 블록 마크다운 없이)
2. DOCTYPE이나 html 태그 없이 본문 내용만 출력
3. 각 섹션은 반드시 다음 형식으로 감싸기 (변경 금지):
   - 외부: div class="a4-page"
   - 내부: div class="proposal-section bg-white rounded-lg shadow-none p-8"
   - 제목: h2 class="text-2xl font-bold mb-6" style="color: {brandColor1}" 또는 style="color: var(--primary)"
4. 섹션 내용이 길 경우, 여러 개의 a4-page div로 나누어 구성
5. 메인 섹션 제목은 반드시 h2 태그에 class="text-2xl font-bold mb-6" + style="color: {brandColor1}" 형식 사용
6. 하위 섹션 제목은 h3 태그에 class="text-lg font-semibold mb-4" + style="color: {brandColor1}" 형식 사용
7. "I. 제안 개요"로 시작하고 "V. 사업 지원 부문"으로 끝나야 합니다.
8. 각 메인 섹션의 기본 하위 항목(1.1, 1.2, 2.1, 2.2 등)을 포함하되, 프로젝트 특성에 맞게 제목을 조정하거나 추가 하위 항목을 생성할 수 있습니다.

### 프로젝트 정보
- 프로젝트명: {projectName}
- 클라이언트사: {clientCompanyName}
- 브랜드 컬러 1: {brandColor1}
- 브랜드 컬러 2: {brandColor2}
- 브랜드 컬러 3: {brandColor3}
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
다음 정보를 적절히 활용하여 제안서를 작성하세요. 기본 소제목 구조를 따르되, 프로젝트 특성에 맞게 조정하거나 추가할 수 있습니다:

**소제목 생성 원칙:**
- 기본 소제목은 반드시 포함하되, 제목은 프로젝트 내용에 맞게 자연스럽게 변경 가능
- 프로젝트 특성에 맞는 추가 하위 소제목(예: 3.2.1, 3.2.2) 생성 가능
- 각 소제목의 내용은 프로젝트의 실제 요구사항과 일치하도록 작성

1. **I. 제안 개요 섹션**:
   - 1.1 제안 배경 및 목적: 슬로건({slogan})이 있으면 프로젝트의 지향 방향성으로 활용
   - 1.2 제안의 범위: 프로젝트 개요({projectOverview})가 있으면 이를 기반으로 작성, 예산({budget})이 있으면 예산 범위를 언급
   - 1.3 제안의 특징 및 장점: 우선순위 기능({priorityFeatures})이 있으면 이를 핵심 기능으로 강조
   - 1.4 기대 효과: 프로젝트 성공 시 기대되는 효과와 가치

2. **II. 제안 전략 섹션**:
   - 2.1 사업 이해 및 분석: 회의록({meetingNotes}) 내용을 분석하여 클라이언트의 비즈니스 모델과 시장 환경 분석
   - 2.2 목표 모델 설계: 프로젝트의 목표 모델 및 비전 설정
   - 2.3 추진 전략: 프로젝트 추진을 위한 핵심 전략 및 단계별 접근 방안

3. **III. 기술 및 기능 부문 섹션**:
   - 3.1 시스템 목표 아키텍처: 전체 시스템 아키텍처 및 기술 스택
   - 3.2 기능 구현 방안: 우선순위 기능({priorityFeatures})을 중심으로 주요 기능 상세 설명
   - 3.3 보안 및 데이터 관리: 보안 정책 및 데이터 관리 전략
   - 3.4 시스템 연계 방안: 외부 시스템 연동 계획

4. **IV. 사업 관리 부문 섹션**:
   - 4.1 추진 일정: 프로젝트 기간({startDate} ~ {endDate}), 검수 기간({reviewPeriod}), 유지보수 기간({maintenancePeriod}), 오픈일({openDate})을 명확히 표시
   - 4.2 수행 조직 및 인력: 투입 인력({teamSize})이 있으면 구체적으로 명시
   - 4.3 개발 방법론: 개발 프로세스 및 품질 관리 프로세스
   - 4.4 품질 보증 계획: 품질 관리 체계 및 테스트 계획

5. **V. 사업 지원 부문 섹션**:
   - 5.1 교육 훈련 계획: 사용자 및 운영자 교육 프로그램
   - 5.2 기술 이전 계획: 기술 문서화 및 지식 전수 방안
   - 5.3 유지보수 및 하자보수: 유지보수 기간({maintenancePeriod})을 포함한 지원 체계
   - 5.4 비상 대책: 장애 대응 절차 및 복구 계획
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
5. description은 프로젝트의 핵심 가치나 목적을 담은 한 줄 설명(30-50자)을 작성하세요.
   - 예시: "디지털 플랫폼을 통한 생활체육 축구 커뮤니티 혁신 제안"
   - 예시: "최신 기술 스택을 활용한 사용자 경험 개선 제안"

**출력 형식 (엄격 준수):**
다음 JSON 형식으로만 출력하세요. 설명이나 다른 텍스트는 포함하지 마세요.

\`\`\`json
{
  "keywords": [
    {"icon": "🎨", "title": "UX 개선"},
    {"icon": "💻", "title": "최신 기술"},
    {"icon": "📈", "title": "성장 지표"}
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
   - 구조: <div class="a4-page bg-white p-8">
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
