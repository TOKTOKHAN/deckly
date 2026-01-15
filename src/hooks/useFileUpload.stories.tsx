import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

/**
 *
 * 파일 업로드 로직을 관리하는 커스텀 훅입니다.
 *
 * ## 사용법
 *
 * `useFileUpload` 훅은 React Hook Form과 함께 사용하여 이미지 파일 업로드를 처리합니다.
 * 파일 검증, base64 변환, 파일 삭제 기능을 제공합니다.
 *
 * ## 매개변수
 *
 * | 매개변수        | 타입                    | 필수 | 기본값        | 설명                          |
 * | --------------- | ----------------------- | ---- | ------------- | ----------------------------- |
 * | `field`         | `Path<T>`               | ✅   | -             | React Hook Form 필드 경로     |
 * | `setValue`      | `UseFormSetValue<T>`    | ✅   | -             | React Hook Form의 setValue 함수 |
 * | `maxSize`       | `number`                | ❌   | `5 * 1024 * 1024` (5MB) | 최대 파일 크기 (바이트) |
 * | `acceptedTypes` | `string[]`              | ❌   | `['image/*']` | 허용할 파일 타입              |
 *
 * ## 반환값
 *
 * `UseFileUploadReturn` 인터페이스를 반환합니다:
 *
 * | 필드              | 타입                                              | 설명                    |
 * | ----------------- | ------------------------------------------------- | ----------------------- |
 * | `inputRef`        | `React.RefObject<HTMLInputElement>`               | 파일 input 요소의 ref   |
 * | `handleFileSelect` | `(e: React.ChangeEvent<HTMLInputElement>) => void` | 파일 선택 핸들러        |
 * | `handleRemoveImage` | `() => void`                                     | 이미지 제거 핸들러      |
 *
 * ## 동작 방식
 *
 * 1. **파일 선택**: 사용자가 파일을 선택하면 `handleFileSelect`가 호출됩니다.
 * 2. **파일 검증**: 파일 크기와 타입을 검증합니다.
 * 3. **Base64 변환**: FileReader를 사용하여 파일을 base64 데이터 URL로 변환합니다.
 * 4. **폼 업데이트**: 변환된 데이터를 React Hook Form의 해당 필드에 저장합니다.
 * 5. **파일 제거**: `handleRemoveImage`를 호출하면 폼 필드를 초기화하고 input을 리셋합니다.
 *
 * ## 특징
 *
 * - **자동 검증**: 파일 크기와 타입을 자동으로 검증합니다.
 * - **Base64 변환**: 이미지를 base64 데이터 URL로 변환하여 폼에 저장합니다.
 * - **에러 처리**: 검증 실패 시 사용자에게 알림을 표시합니다.
 * - **타입 안정성**: TypeScript와 React Hook Form의 타입 시스템을 활용합니다.
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { useForm } from 'react-hook-form';
 * import { useFileUpload } from '@/hooks/useFileUpload';
 *
 * interface FormData {
 *   logo: string | undefined;
 * }
 *
 * function MyForm() {
 *   const { register, setValue, formState: { errors } } = useForm<FormData>();
 *
 *   const logoUpload = useFileUpload<FormData>({
 *     field: 'logo',
 *     setValue,
 *     maxSize: 10 * 1024 * 1024, // 10MB
 *     acceptedTypes: ['image/png', 'image/jpeg'],
 *   });
 *
 *   return (
 *     <form>
 *       <label>
 *         로고 업로드
 *         <input
 *           ref={logoUpload.inputRef}
 *           type="file"
 *           accept="image/*"
 *           onChange={logoUpload.handleFileSelect}
 *         />
 *       </label>
 *       {errors.logo && <span>{errors.logo.message}</span>}
 *       <button type="button" onClick={logoUpload.handleRemoveImage}>
 *         이미지 제거
 *       </button>
 *     </form>
 *   );
 * }
 * ```
 *
 * ## 파일 크기 제한
 *
 * 기본값은 5MB입니다. `maxSize` 옵션으로 변경할 수 있습니다:
 *
 * ```tsx
 * // 10MB로 설정
 * const upload = useFileUpload({
 *   field: 'image',
 *   setValue,
 *   maxSize: 10 * 1024 * 1024, // 10MB
 * });
 * ```
 *
 * ## 허용 파일 타입
 *
 * 기본값은 `['image/*']`입니다. 특정 타입만 허용하려면:
 *
 * ```tsx
 * // PNG와 JPEG만 허용
 * const upload = useFileUpload({
 *   field: 'image',
 *   setValue,
 *   acceptedTypes: ['image/png', 'image/jpeg'],
 * });
 *
 * // 와일드카드 사용 가능
 * const upload = useFileUpload({
 *   field: 'image',
 *   setValue,
 *   acceptedTypes: ['image/*'], // 모든 이미지 타입
 * });
 * ```
 *
 * ## 에러 처리
 *
 * 훅은 다음 경우에 에러를 처리합니다:
 *
 * - 파일 크기 초과: 사용자에게 알림을 표시하고 파일 선택을 취소합니다.
 * - 지원하지 않는 파일 타입: 사용자에게 알림을 표시하고 파일 선택을 취소합니다.
 * - 파일 읽기 오류: 콘솔에 에러를 기록하고 사용자에게 알림을 표시합니다.
 *
 * ## 주의사항
 *
 * - 이 훅은 React Hook Form과 함께 사용해야 합니다.
 * - `setValue`는 React Hook Form의 `setValue` 함수여야 합니다.
 * - 파일은 base64 데이터 URL로 변환되어 저장됩니다.
 * - 큰 파일의 경우 base64 변환에 시간이 걸릴 수 있습니다.
 * - `field`는 React Hook Form의 필드 경로와 일치해야 합니다.
 */
const meta = {
  title: 'Hooks/useFileUpload',
  tags: ['autodocs'],
  parameters: {
    docsOnly: true,
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// 문서만 표시하기 위한 더미 스토리
// 훅 파일이므로 실제 스토리는 제공하지 않습니다.
// eslint-disable-next-line storybook/story-exports
export const Docs: Story = {
  render: () => <div style={{ display: 'none' }} />,
  parameters: {
    docs: {
      description: {
        story:
          '이 파일은 커스텀 훅만 포함하므로 실제 스토리는 제공하지 않습니다. 문서만 참고하세요.',
      },
    },
  },
};
