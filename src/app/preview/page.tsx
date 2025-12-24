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
    projectName: '사업제안서 자동화 플랫폼',
    clientCompanyName: '똑똑한개발자',
    brandColor1: '#eb4034',
    brandColor2: '#34c3eb',
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
          templateContent = generateTableOfContentsTemplate(
            sampleData.brandColor1,
            sampleData.brandColor2,
          );
          break;
        case 'conclusion':
          templateContent = generateConclusionTemplate(sampleData);
          break;
        case 'all':
          const cover = generateCoverTemplate(sampleData);
          const toc = generateTableOfContentsTemplate(
            sampleData.brandColor1,
            sampleData.brandColor2,
          );
          const conclusion = generateConclusionTemplate(sampleData);
          templateContent = cover + toc + conclusion;
          break;
        default:
          templateContent = '';
      }

      // generateHTMLWrapper로 감싸서 Tailwind CDN이 로드되도록 함
      const fullHTML = generateHTMLWrapper(
        templateContent,
        sampleData.font,
        sampleData.brandColor1,
        sampleData.brandColor2,
      );

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
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">템플릿 미리보기</h1>
          <p className="mb-6 text-gray-600">
            제안서 템플릿의 스타일을 확인할 수 있습니다. 아래 버튼을 클릭하여 각 템플릿을
            확인하세요.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedTemplate('cover')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'cover'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              표지
            </button>
            <button
              onClick={() => setSelectedTemplate('toc')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'toc'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              목차
            </button>
            <button
              onClick={() => setSelectedTemplate('conclusion')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'conclusion'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              끝마무리
            </button>
            <button
              onClick={() => setSelectedTemplate('all')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              전체
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-xl">
          <div className="mb-4 flex justify-end gap-3">
            <button
              onClick={() => {
                if (iframeRef.current?.contentWindow) {
                  iframeRef.current.contentWindow.print();
                }
              }}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
            >
              📄 PDF 미리보기 (인쇄)
            </button>
          </div>
          <div className="overflow-hidden rounded-lg border-2 border-gray-200">
            <iframe
              ref={iframeRef}
              className="min-h-[800px] w-full border-0"
              title="템플릿 미리보기"
              sandbox="allow-same-origin allow-scripts allow-modals"
            />
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold text-gray-900">샘플 데이터</h2>
          <pre className="overflow-auto rounded-lg bg-gray-100 p-4 text-sm">
            {JSON.stringify(sampleData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
