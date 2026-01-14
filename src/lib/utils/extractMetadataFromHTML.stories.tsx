import type { Meta, StoryObj } from '@storybook/nextjs-vite';

/**
 *
 * HTML 콘텐츠에서 제안서 메타데이터를 추출하는 유틸리티 함수입니다.
 *
 * ## 함수 목록
 *
 * - `extractMetadataFromHTML`: HTML에서 제목과 클라이언트명 추출
 *
 * ## extractMetadataFromHTML
 *
 * HTML 콘텐츠에서 제안서의 제목(`projectName`)과 클라이언트명(`clientCompanyName`)을 추출합니다.
 *
 * ### 매개변수
 *
 * | 매개변수      | 타입     | 필수 | 설명           |
 * | ------------- | -------- | ---- | -------------- |
 * | `htmlContent` | `string` | ✅   | HTML 문자열    |
 *
 * ### 반환값
 *
 * 객체:
 *
 * | 필드              | 타입     | 설명           |
 * | ----------------- | -------- | -------------- |
 * | `projectName`     | `string \| undefined` | 프로젝트명 (첫 번째 h1 태그) |
 * | `clientCompanyName` | `string \| undefined` | 클라이언트명 (표지의 p 태그) |
 *
 * ### 추출 방법
 *
 * 1. **제목 추출**: 첫 번째 `h1` 태그의 텍스트 내용
 * 2. **클라이언트명 추출**:
 *    - 표지 영역(`.a4-page`)에서 `TOKTOKHAN.DEV` 다음에 오는 `p` 태그
 *    - 또는 의미있는 첫 번째 `p` 태그
 *
 * ### 사용 예시
 *
 * ```tsx
 * import { extractMetadataFromHTML } from '@/lib/utils/extractMetadataFromHTML';
 *
 * const html = `
 *   <div class="a4-page">
 *     <h1>모바일 앱 개발 프로젝트</h1>
 *     <p>TOKTOKHAN.DEV</p>
 *     <p>삼성전자</p>
 *   </div>
 * `;
 *
 * const metadata = extractMetadataFromHTML(html);
 * // {
 * //   projectName: '모바일 앱 개발 프로젝트',
 * //   clientCompanyName: '삼성전자'
 * // }
 * ```
 *
 * ### 에러 처리
 *
 * HTML 파싱 중 에러가 발생하면 빈 객체를 반환합니다:
 *
 * ```tsx
 * try {
 *   const metadata = extractMetadataFromHTML(html);
 * } catch (error) {
 *   // 에러는 내부에서 처리되므로 빈 객체 반환
 *   console.log(metadata); // {}
 * }
 * ```
 *
 * ## 주의사항
 *
 * - 이 함수는 브라우저 환경에서만 동작합니다 (`DOMParser` 사용).
 * - HTML 파싱 실패 시 빈 객체를 반환합니다.
 * - 클라이언트명 추출은 휴리스틱 방식으로 동작합니다.
 * - `TOKTOKHAN.DEV` 텍스트를 기준으로 클라이언트명을 찾습니다.
 */
const meta = {
  title: 'Lib/Utils/extractMetadataFromHTML',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 유틸리티 함수 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 유틸리티 함수만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
