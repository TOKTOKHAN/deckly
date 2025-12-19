'use client';

import { useState } from 'react';
import apiClient from '@/lib/axios/client';
import { ProposalRequest, ProposalResponse } from '@/types/gemini';

export default function ProposalForm() {
  const [meetingNotes, setMeetingNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const { data } = await apiClient.post<ProposalResponse>('/gemini', {
        meetingNotes,
      } as ProposalRequest);

      if (!data.success) {
        setError(data.error || '제안서 생성에 실패했습니다.');
        console.error('API 에러:', data);
        return;
      }

      setResult(data.content);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '제안서 생성 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('에러:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">제안서 생성</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="meetingNotes" className="block text-sm font-medium mb-2">
            회의록/메모 입력
          </label>
          <textarea
            id="meetingNotes"
            value={meetingNotes}
            onChange={e => setMeetingNotes(e.target.value)}
            placeholder="고객 미팅 회의록이나 프로젝트 메모를 입력하세요..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !meetingNotes.trim()}
          className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '생성 중...' : '제안서 생성'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">생성된 제안서</h2>
          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result }} />
          </div>
        </div>
      )}
    </div>
  );
}
