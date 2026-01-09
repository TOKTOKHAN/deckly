'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { getOrCreateVisitorId } from '@/lib/utils/cookies';

/* 방문자 수 추적 컴포넌트 페이지 로드 시 한 번만 방문자 수를 기록합니다. */
export default function VisitTracker() {
  const user = useAuthStore(state => state.user);
  const session = useAuthStore(state => state.session);
  const isLoading = useAuthStore(state => state.isLoading);
  const trackedRef = useRef<boolean>(false); // 같은 세션에서 이미 추적했는지 여부

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (trackedRef.current) {
      return;
    }

    // 로그인 사용자인 경우 세션이 완전히 준비될 때까지 대기
    // (로그인 직후 세션 토큰이 아직 동기화되지 않을 수 있음)
    // session이 설정되면 useEffect가 다시 실행되므로 재시도됨
    if (user && !session) {
      return;
    }

    // 페이지 방문 기록 (한 번만 실행)
    const trackVisit = async () => {
      try {
        // 쿠키에서 고유 방문자 ID 가져오기 또는 생성
        const visitorId = getOrCreateVisitorId();

        if (!visitorId) {
          // 쿠키 생성 실패 시 스킵
          return;
        }

        // 로그인 사용자 ID (인증 상태가 로드된 후 정확한 값 사용)
        const userId = user?.id || null;

        // localStorage에서 오늘 이미 기록했는지 확인
        const today = new Date().toISOString().split('T')[0];
        const trackKey = userId || visitorId;
        const storageKey = `track_${today}_${trackKey}`;
        const alreadyTracked = localStorage.getItem(storageKey);

        if (alreadyTracked === 'true') {
          // 이미 오늘 기록했으면 스킵
          trackedRef.current = true;
          return;
        }

        const response = await fetch('/api/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            visitorId,
            userId,
          }),
        });

        if (response.ok) {
          // 성공하면 localStorage에 기록하여 중복 방지 (하루 동안 유지)
          localStorage.setItem(storageKey, 'true');
          trackedRef.current = true;

          // 어제 기록은 정리 (선택적)
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayKey = `track_${yesterday.toISOString().split('T')[0]}_${trackKey}`;
          localStorage.removeItem(yesterdayKey);
        } else {
          const error = await response.json();
          // eslint-disable-next-line no-console
          console.error('방문자 수 기록 실패:', error);
        }
      } catch (error) {
        // 방문자 수 기록 실패해도 페이지는 정상 작동
        // eslint-disable-next-line no-console
        console.error('방문자 수 기록 오류:', error);
      }
    };

    // 인증 상태가 로드된 후 실행
    trackVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, session, isLoading]); // user?.id, session 또는 isLoading이 변경될 때 실행

  return null;
}
