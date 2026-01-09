import { NextRequest, NextResponse } from 'next/server';
import { adminSupabase, isAdminClientAvailable } from '@/lib/supabase/admin/client';
import type { SupabaseClient } from '@supabase/supabase-js';

/* 방문자 수 기록 API 페이지 방문 시 호출하여 일일 방문자 수를 기록합니다.
 * 쿠키 기반 visitor_id와 로그인 사용자 user_id를 사용하여 중복을 방지합니다.
 */
export async function POST(request: NextRequest) {
  try {
    if (!isAdminClientAvailable() || !adminSupabase) {
      return NextResponse.json({ error: '서비스를 사용할 수 없습니다.' }, { status: 500 });
    }

    const body = await request.json();
    const { visitorId, userId } = body;

    if (!visitorId) {
      return NextResponse.json({ error: 'visitor_id가 필요합니다.' }, { status: 400 });
    }

    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD

    // 중복 체크: 로그인 사용자는 user_id로, 비로그인 사용자는 visitor_id로 체크
    let existingLog = null;

    if (userId) {
      const { data: userLog, error: userLogError } = await adminSupabase
        .from('visitor_logs')
        .select('id')
        .eq('date', todayString)
        .eq('user_id', userId)
        .single();

      if (userLogError && userLogError.code !== 'PGRST116') {
        // eslint-disable-next-line no-console
        console.error('사용자 방문 기록 조회 오류:', userLogError);
      } else if (userLog) {
        existingLog = userLog;
      }
    } else {
      // 비로그인 사용자인 경우: visitor_id로만 중복 체크 (같은 브라우저는 하루에 1회만)
      const { data: visitorLog, error: visitorLogError } = await adminSupabase
        .from('visitor_logs')
        .select('id')
        .eq('date', todayString)
        .eq('visitor_id', visitorId)
        .single();

      if (visitorLogError && visitorLogError.code !== 'PGRST116') {
        // eslint-disable-next-line no-console
        console.error('방문자 기록 조회 오류:', visitorLogError);
      } else if (visitorLog) {
        existingLog = visitorLog;
      }
    }

    // 중복이 있으면 스킵
    if (existingLog) {
      return NextResponse.json({
        success: true,
        message: '이미 기록된 방문입니다.',
        skipped: true,
      });
    }

    // 새로운 방문 기록 추가
    const { error: insertError } = await adminSupabase.from('visitor_logs').insert({
      date: todayString,
      visitor_id: visitorId,
      user_id: userId || null,
    });

    if (insertError) {
      // eslint-disable-next-line no-console
      console.error('방문 기록 삽입 오류:', insertError);
      return NextResponse.json({ error: '방문 기록 저장 실패' }, { status: 500 });
    }

    // visitor_stats 집계 업데이트 (선택적: 실시간 집계가 필요하면 주석 해제)
    // 또는 별도 스케줄러로 집계할 수도 있습니다
    if (adminSupabase) {
      await updateVisitorStats(adminSupabase, todayString);
    }

    return NextResponse.json({ success: true, message: '방문자 수가 기록되었습니다.' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('방문자 수 기록 오류:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '방문자 수 기록 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

/* visitor_stats 집계 업데이트 (날짜별 고유 방문자 수) */
async function updateVisitorStats(adminSupabase: SupabaseClient, dateString: string) {
  try {
    // 날짜별 고유 방문자 수 계산
    const { data: logs, error: logsError } = await adminSupabase
      .from('visitor_logs')
      .select('user_id, visitor_id')
      .eq('date', dateString);

    if (logsError) {
      // eslint-disable-next-line no-console
      console.error('방문 로그 조회 오류:', logsError);
      return;
    }

    // 고유 방문자 수 계산 (user_id가 있으면 user_id 기준, 없으면 visitor_id 기준)
    const uniqueVisitors = new Set<string>();
    logs?.forEach((log: { user_id: string | null; visitor_id: string }) => {
      if (log.user_id) {
        uniqueVisitors.add(`user_${log.user_id}`);
      } else {
        uniqueVisitors.add(`visitor_${log.visitor_id}`);
      }
    });

    const visitorCount = uniqueVisitors.size;

    // visitor_stats 업데이트 또는 삽입
    const { data: existing, error: selectError } = await adminSupabase
      .from('visitor_stats')
      .select('id')
      .eq('date', dateString)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // eslint-disable-next-line no-console
      console.error('통계 조회 오류:', selectError);
      return;
    }

    if (existing) {
      // 기존 데이터 업데이트
      await adminSupabase
        .from('visitor_stats')
        .update({ visitor_count: visitorCount })
        .eq('date', dateString);
    } else {
      // 새 데이터 삽입
      await adminSupabase.from('visitor_stats').insert({
        date: dateString,
        visitor_count: visitorCount,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('통계 업데이트 오류:', error);
  }
}
