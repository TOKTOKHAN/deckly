'use client';

import { useRef, useCallback } from 'react';
import { UseFormSetValue, FieldValues, Path } from 'react-hook-form';

interface UseFileUploadOptions<T extends FieldValues> {
  field: Path<T>;
  setValue: UseFormSetValue<T>;
  maxSize?: number; // 바이트 단위 (기본값: 5MB)
  acceptedTypes?: string[]; // 기본값: ['image/*']
}

interface UseFileUploadReturn {
  inputRef: React.RefObject<HTMLInputElement>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
}

/**
 * 파일 업로드 로직을 관리하는 커스텀 훅
 * 이미지 파일 검증, FileReader를 통한 base64 변환, 파일 삭제 기능을 제공합니다.
 *
 * @param options - 파일 업로드 옵션
 * @returns 파일 업로드 관련 ref와 핸들러 함수들
 */
export function useFileUpload<T extends FieldValues>({
  field,
  setValue,
  maxSize = 5 * 1024 * 1024, // 기본값: 5MB
  acceptedTypes = ['image/*'],
}: UseFileUploadOptions<T>): UseFileUploadReturn {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 파일 크기 제한 검증
      if (file.size > maxSize) {
        alert(`파일 크기는 ${Math.round(maxSize / 1024 / 1024)}MB 이하여야 합니다.`);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        return;
      }

      // 파일 타입 검증
      const isAcceptedType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          const baseType = type.slice(0, -2);
          return file.type.startsWith(baseType);
        }
        return file.type === type;
      });

      if (!isAcceptedType) {
        alert('지원하지 않는 파일 형식입니다.');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
        return;
      }

      // FileReader로 파일을 base64로 변환
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const result = reader.result as string;
          if (result) {
            // base64 데이터 URL을 저장
            setValue(field, result as T[Path<T>], { shouldValidate: true });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('파일 읽기 오류:', error);
          alert('파일을 읽는 중 오류가 발생했습니다.');
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        }
      };
      reader.onerror = () => {
        // eslint-disable-next-line no-console
        console.error('파일 읽기 오류');
        alert('파일을 읽는 중 오류가 발생했습니다.');
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      };
      reader.readAsDataURL(file);
    },
    [field, setValue, maxSize, acceptedTypes],
  );

  const handleRemoveImage = useCallback(() => {
    setValue(field, undefined as T[Path<T>], { shouldValidate: true });
    // 파일 input 초기화
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [field, setValue]);

  return {
    inputRef,
    handleFileSelect,
    handleRemoveImage,
  };
}
