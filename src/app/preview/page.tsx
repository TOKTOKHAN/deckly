'use client';

import { useState, useRef, useEffect } from 'react';
import {
  generateCoverTemplate,
  generateTableOfContentsTemplate,
  generateConclusionTemplate,
  generateHTMLWrapper,
  TemplateData,
} from '@/lib/gemini/templates';

export default function PreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<'cover' | 'toc' | 'conclusion' | 'all'>(
    'all',
  );
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sampleData: TemplateData = {
    projectName: '테스트 프로젝트명',
    clientCompanyName: '테스트 고객사',
    clientContact: '홍길동',
    meetingDate: '2025-01-15',
    ourContact: '김철수',
    proposalDate: '2025-01-20',
  };

  // iframe 내용 업데이트
  useEffect(() => {
    if (iframeRef.current) {
      let templateContent = '';

      switch (selectedTemplate) {
        case 'cover':
          templateContent = generateCoverTemplate(sampleData);
          break;
        case 'toc':
          templateContent = generateTableOfContentsTemplate();
          break;
        case 'conclusion':
          templateContent = generateConclusionTemplate(sampleData);
          break;
        case 'all':
          const cover = generateCoverTemplate(sampleData);
          const toc = generateTableOfContentsTemplate();
          const conclusion = generateConclusionTemplate(sampleData);
          templateContent = cover + toc + conclusion;
          break;
        default:
          templateContent = '';
      }

      // generateHTMLWrapper로 감싸서 Tailwind CDN이 로드되도록 함
      const fullHTML = generateHTMLWrapper(templateContent);

      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(fullHTML);
        iframeDoc.close();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">템플릿 미리보기</h1>
          <p className="text-gray-600 mb-6">
            제안서 템플릿의 스타일을 확인할 수 있습니다. 아래 버튼을 클릭하여 각 템플릿을
            확인하세요.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTemplate('cover')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedTemplate === 'cover'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              표지
            </button>
            <button
              onClick={() => setSelectedTemplate('toc')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedTemplate === 'toc'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              목차
            </button>
            <button
              onClick={() => setSelectedTemplate('conclusion')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedTemplate === 'conclusion'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              끝마무리
            </button>
            <button
              onClick={() => setSelectedTemplate('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedTemplate === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              전체
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <iframe
              ref={iframeRef}
              className="w-full min-h-[800px] border-0"
              title="템플릿 미리보기"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">샘플 데이터</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(sampleData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
