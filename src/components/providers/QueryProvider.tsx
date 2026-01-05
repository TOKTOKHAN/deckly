'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
            refetchOnWindowFocus: false, // 창 포커스 시 자동 리프레시 비활성화
            retry: 1, // 실패 시 1번만 재시도
          },
          mutations: {
            retry: 1, // 실패 시 1번만 재시도
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
