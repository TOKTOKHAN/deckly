# DECKLY

AI 기반 사업 제안서 생성 플랫폼

## 프로젝트 소개

DECKLY는 미팅 전사록을 입력하면 AI가 자동으로 전문적인 사업 제안서를 생성해주는 플랫폼입니다. 생성된 제안서는 PDF로 다운로드할 수 있습니다.

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **AI**: Google Gemini API, LangChain
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **Form**: React Hook Form + Zod
- **Charts**: Recharts

## 시작하기

### 필수 요구사항

- Node.js 18 이상
- pnpm (권장) 또는 npm/yarn

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## Storybook

프로젝트의 컴포넌트, 훅, 유틸리티 함수 등을 문서화한 Storybook이 포함되어 있습니다.

### Storybook 실행

```bash
pnpm storybook
```

브라우저에서 [http://localhost:6006](http://localhost:6006)을 열어 Storybook을 확인할 수 있습니다.

### Storybook 구조

- **Components**: UI 컴포넌트들
- **Hooks**: 커스텀 훅들 (`useAnalytics`, `useRequireAuth` 등)
- **Stores**: Zustand 스토어들 (`authStore`)
- **Types**: TypeScript 타입 정의들
- **Lib**: 유틸리티 함수, API 클라이언트, Supabase 함수들
- **Contexts**: React Context Provider들
- **Skeletons**: 로딩 스켈레톤 컴포넌트들

### Storybook 사용 목적

이 Storybook은 **인수인계용 문서**로 작성되었습니다. 각 컴포넌트와 함수의:

- 사용법
- Props/매개변수
- 반환값
- 사용 예시
- 주의사항

등을 확인할 수 있습니다.

### Storybook 빌드

정적 파일로 빌드하려면:

```bash
pnpm build-storybook
```

빌드된 파일은 `storybook-static` 폴더에 생성됩니다.

## 스크립트

```bash
# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린트 검사
pnpm lint

# 코드 포맷팅
pnpm format

# 코드 포맷팅 검사
pnpm format:check

# Storybook 실행
pnpm storybook

# Storybook 빌드
pnpm build-storybook
```

## 프로젝트 구조

```
deckly/
├── src/
│   ├── app/              # Next.js App Router 페이지
│   ├── components/       # React 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── lib/              # 유틸리티 함수 및 클라이언트
│   ├── stores/           # Zustand 스토어
│   ├── types/            # TypeScript 타입 정의
│   ├── contexts/         # React Context
│   └── ...
├── .storybook/           # Storybook 설정
└── supabase/             # Supabase 마이그레이션 파일
```
