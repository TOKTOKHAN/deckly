'use client';

import { useEffect } from 'react';

/**
 * 방문자 수 추적 컴포넌트
 * 페이지 로드 시 한 번만 방문자 수를 기록합니다.
 */
export default function VisitTracker() {
  useEffect(() => {
    // 페이지 방문 기록 (한 번만 실행)
    const trackVisit = async () => {
      try {
        // 세션 스토리지에 오늘 날짜 기록 여부 확인
        const today = new Date().toISOString().split('T')[0];
        const lastTrackedDate = sessionStorage.getItem('lastTrackedDate');

        // 오늘 이미 기록했으면 스킵 (중복 방지)
        if (lastTrackedDate === today) {
          return;
        }

        const response = await fetch('/api/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // 오늘 날짜 기록
          sessionStorage.setItem('lastTrackedDate', today);
        }
      } catch (error) {
        // 방문자 수 기록 실패해도 페이지는 정상 작동
        // eslint-disable-next-line no-console
        console.error('방문자 수 기록 실패:', error);
      }
    };

    trackVisit();
  }, []);

  return null; // UI 렌더링 없음
}
