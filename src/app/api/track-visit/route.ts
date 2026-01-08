import { NextResponse } from 'next/server';
import { adminSupabase, isAdminClientAvailable } from '@/lib/supabase/admin/client';

/**
 * 방문자 수 기록 API
 * 페이지 방문 시 호출하여 일일 방문자 수를 증가시킵니다.
 */
export async function POST() {
  try {
    if (!isAdminClientAvailable() || !adminSupabase) {
      return NextResponse.json({ error: '서비스를 사용할 수 없습니다.' }, { status: 500 });
    }

    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD

    // 먼저 오늘 날짜의 데이터 조회
    const { data: existing, error: selectError } = await adminSupabase
      .from('visitor_stats')
      .select('*')
      .eq('date', todayString)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116은 데이터가 없을 때 발생하는 에러 (정상)
      // eslint-disable-next-line no-console
      console.error('방문자 수 조회 오류:', selectError);
      return NextResponse.json({ error: '방문자 수 조회 실패' }, { status: 500 });
    }

    if (existing) {
      // 기존 데이터가 있으면 방문자 수 증가
      const { error: updateError } = await adminSupabase
        .from('visitor_stats')
        .update({ visitor_count: (existing.visitor_count || 0) + 1 })
        .eq('date', todayString);

      if (updateError) {
        // eslint-disable-next-line no-console
        console.error('방문자 수 업데이트 오류:', updateError);
        return NextResponse.json({ error: '방문자 수 업데이트 실패' }, { status: 500 });
      }
    } else {
      // 데이터가 없으면 새로 생성
      const { error: insertError } = await adminSupabase.from('visitor_stats').insert({
        date: todayString,
        visitor_count: 1,
      });

      if (insertError) {
        // eslint-disable-next-line no-console
        console.error('방문자 수 삽입 오류:', insertError);
        return NextResponse.json({ error: '방문자 수 기록 실패' }, { status: 500 });
      }
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
