'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
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
  const printIframeRef = useRef<HTMLIFrameElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const sampleData: TemplateData = useMemo(
    () => ({
      projectName: '사업제안서 자동화 플랫폼 기획 및 구축',
      clientCompanyName: 'TOKTOKHAN.DEV',
      brandColor1: '#52b8f2',
      brandColor2: '#975ef2',
      brandColor3: '#f5e8e0',
    }),
    [],
  );

  // 템플릿 내용 생성
  const [templateContent, setTemplateContent] = useState('');

  useEffect(() => {
    const loadTemplateContent = async () => {
      let content = '';

      switch (selectedTemplate) {
        case 'cover':
          content = await generateCoverTemplate(sampleData);
          break;
        case 'toc':
          content = generateTableOfContentsTemplate(sampleData.brandColor1, sampleData.brandColor2);
          break;
        case 'conclusion':
          content = generateConclusionTemplate(sampleData);
          break;
        case 'all':
          const cover = await generateCoverTemplate(sampleData);
          const toc = generateTableOfContentsTemplate(
            sampleData.brandColor1,
            sampleData.brandColor2,
          );
          const conclusion = generateConclusionTemplate(sampleData);
          content = cover + toc + conclusion;
          break;
        default:
          content = '';
      }

      setTemplateContent(content);
    };

    loadTemplateContent();
  }, [selectedTemplate, sampleData]);

  // Tailwind CDN 및 폰트 동적 로드
  useEffect(() => {
    // Tailwind CDN이 이미 로드되어 있는지 확인
    if (document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
      return;
    }

    // Tailwind CDN 스크립트 로드
    const tailwindScript = document.createElement('script');
    tailwindScript.src = 'https://cdn.tailwindcss.com';
    tailwindScript.async = true;
    document.head.appendChild(tailwindScript);

    // Pretendard 폰트 로드
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css';
    if (!document.querySelector(`link[href="${fontLink.href}"]`)) {
      document.head.appendChild(fontLink);
    }

    return () => {};
  }, []);

  // PDF 인쇄 함수
  const handlePrint = async () => {
    if (!templateContent) {
      alert('인쇄할 내용이 없습니다.');
      return;
    }

    // generateHTMLWrapper로 감싸서 완전한 HTML 생성
    const fullHTML = generateHTMLWrapper(
      templateContent,
      sampleData.font,
      sampleData.brandColor1,
      sampleData.brandColor2,
      sampleData.brandColor3,
    );

    // 숨겨진 iframe 생성 (화면에 보이지 않음)
    if (!printIframeRef.current) {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
      printIframeRef.current = iframe;
    }

    const iframe = printIframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(fullHTML);
      iframeDoc.close();

      setTimeout(() => {
        if (iframe.contentWindow) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        }
      }, 500);
    }
  };

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
              onClick={handlePrint}
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700"
            >
              📄 PDF 미리보기 (인쇄)
            </button>
          </div>
          <div
            ref={contentRef}
            className="a4-preview-container"
            dangerouslySetInnerHTML={{ __html: templateContent }}
          />
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
