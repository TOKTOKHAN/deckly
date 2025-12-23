'use client';

import { useState, useEffect, useRef } from 'react';
import { Proposal } from '@/types/proposal';
import { updateProposal } from '@/lib/supabase/proposals';
import { extractMetadataFromHTML } from '@/lib/utils/extractMetadataFromHTML';
import Button from '@/components/ui/Button';
import { ChevronLeft, Download, Edit, RefreshCw, Save, X } from '@/components/icons';

interface ResultViewProps {
  proposal: Proposal;
  onBack: () => void;
  onRegenerate: (proposalId: string, proposalData: Proposal) => void;
  onUpdate: (updatedProposal: Proposal) => void;
}

// HTML에서 body 내용만 추출하는 함수
function extractBodyContent(html: string): string {
  try {
    // DOCTYPE이나 html 태그가 없으면 그대로 반환
    if (!html.includes('<!DOCTYPE') && !html.includes('<html')) {
      return html;
    }

    // body 태그 내용 추출
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) {
      return bodyMatch[1];
    }

    // body 태그가 없으면 전체 내용 반환
    return html;
  } catch (error) {
    console.error('HTML 파싱 오류:', error);
    return html;
  }
}

export default function ResultView({ proposal, onBack, onRegenerate, onUpdate }: ResultViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [originalContent, setOriginalContent] = useState<string>('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // body 내용만 추출
  const bodyContent = proposal?.content ? extractBodyContent(proposal.content) : '';

  // Tailwind CDN 및 스타일 동적 로드 (표지 그라데이션 등 Tailwind 클래스 사용을 위해)
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

    // 표지 그라데이션을 위한 CSS 직접 추가 (Tailwind CDN이 로드되기 전에도 작동)
    const styleId = 'proposal-cover-gradient-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* 표지 그라데이션 스타일 (Tailwind 클래스가 로드되기 전에도 작동) */
        .a4-page.bg-gradient-to-br,
        .a4-page[class*="bg-gradient-to-br"][class*="from-indigo-600"][class*="to-gray-800"],
        div.a4-page:first-child {
          background: linear-gradient(to bottom right, #4f46e5, #1f2937) !important;
          color: white !important;
        }
        /* Tailwind 클래스가 로드된 후에도 작동하도록 */
        .bg-gradient-to-br.from-indigo-600.to-gray-800 {
          background: linear-gradient(to bottom right, #4f46e5, #1f2937) !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      // cleanup은 하지 않음 (다른 곳에서도 사용할 수 있음)
    };
  }, [bodyContent]);

  // 공통 스타일 적용 함수 - 레이아웃만 처리 (세부 스타일은 templates.ts의 인라인 스타일 사용)
  // templates.ts에서 이미 인라인 스타일로 모든 것을 정의했으므로, 여기서는 레이아웃 관련만 처리
  const applyCommonStyles = (container: HTMLElement | null) => {
    if (!container) return;

    // 표지 페이지 찾기 (첫 번째 a4-page) - 레이아웃만 처리
    const coverPage = container.querySelector('.a4-page:first-child') as HTMLElement | null;
    if (coverPage) {
      // 표지 패딩 제거 (레이아웃 관련만 - templates.ts의 인라인 스타일과 중복되지만 안전을 위해 유지)
      coverPage.style.padding = '0';

      // 표지 내부 컨테이너 중앙 정렬 (레이아웃 관련만)
      const coverInnerDiv = coverPage.querySelector('div');
      if (coverInnerDiv) {
        (coverInnerDiv as HTMLElement).style.width = '100%';
        (coverInnerDiv as HTMLElement).style.display = 'flex';
        (coverInnerDiv as HTMLElement).style.flexDirection = 'column';
        (coverInnerDiv as HTMLElement).style.alignItems = 'center';
        (coverInnerDiv as HTMLElement).style.justifyContent = 'center';
        (coverInnerDiv as HTMLElement).style.textAlign = 'center';
      }
    }

    // 끝마무리 페이지는 templates.ts의 인라인 스타일로 충분하므로 추가 처리 불필요
  };

  // bodyContent가 렌더링된 후 표지와 끝마무리에 직접 스타일 적용 (화면 표시용)
  useEffect(() => {
    if (!bodyContent || !contentRef.current) return;

    // 렌더링 후 스타일 적용 (약간의 지연 필요)
    const timer = setTimeout(() => {
      applyCommonStyles(contentRef.current);
    }, 300);
    return () => clearTimeout(timer);
  }, [bodyContent]);

  const handlePrint = () => {
    if (!contentRef.current) {
      alert('인쇄할 내용이 없습니다.');
      return;
    }

    // 공통 스타일 적용 함수 사용 (화면 표시와 동일)
    applyCommonStyles(contentRef.current);

    // 약간의 지연 후 인쇄 (스타일 적용 시간 확보)
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // 편집 모드 진입
  const handleEdit = () => {
    if (!bodyContent) return;

    setOriginalContent(bodyContent);
    setIsEditing(true);
    setHasChanges(false);
  };

  // 편집 모드 진입 시 HTML 설정
  useEffect(() => {
    if (isEditing && editableRef.current && bodyContent) {
      // contentEditable이 활성화된 후 HTML 설정 (body 내용만)
      editableRef.current.innerHTML = bodyContent;
      // 포커스를 첫 번째 편집 가능한 요소로 이동
      setTimeout(() => {
        if (!editableRef.current) return;

        editableRef.current.focus();
        // 커서를 시작 위치로 이동
        const range = document.createRange();
        const sel = window.getSelection();
        if (sel && editableRef.current.firstChild) {
          range.setStart(editableRef.current.firstChild, 0);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }, 100);
    }
  }, [isEditing, bodyContent]);

  // 편집 내용 변경 감지
  const handleContentChange = () => {
    if (!editableRef.current || !originalContent) return;

    const currentContent = editableRef.current.innerHTML;
    setHasChanges(currentContent !== originalContent);
  };

  // 저장
  const handleSave = async () => {
    if (!editableRef.current || !proposal) return;

    const updatedBodyContent = editableRef.current.innerHTML;
    setIsSaving(true);

    try {
      // HTML에서 제목과 클라이언트명 추출
      const extractedMetadata = extractMetadataFromHTML(updatedBodyContent);

      // 원본 HTML 구조 유지 (body 내용만 교체)
      let updatedContent = proposal.content || '';
      if (updatedContent.includes('<body')) {
        // body 태그 내용만 교체
        updatedContent = updatedContent.replace(
          /<body[^>]*>([\s\S]*)<\/body>/i,
          `<body class="bg-white">${updatedBodyContent}</body>`,
        );
      } else {
        // body 태그가 없으면 그대로 사용
        updatedContent = updatedBodyContent;
      }

      const updatedProposal: Proposal = {
        ...proposal,
        content: updatedContent,
        // HTML에서 추출한 메타데이터로 업데이트 (값이 있을 경우만)
        projectName: extractedMetadata.projectName || proposal.projectName,
        clientCompanyName: extractedMetadata.clientCompanyName || proposal.clientCompanyName,
        updatedAt: new Date().toISOString(),
      };

      console.log('업데이트할 메타데이터:', {
        projectName: updatedProposal.projectName,
        clientCompanyName: updatedProposal.clientCompanyName,
        extracted: extractedMetadata,
      });

      // Supabase에 저장
      const savedProposal = await updateProposal(updatedProposal);

      console.log('제안서 저장 성공:', savedProposal.id);

      // 상태 업데이트 (Supabase에서 반환된 데이터 사용)
      onUpdate(savedProposal);

      setIsEditing(false);
      setHasChanges(false);
      setOriginalContent('');

      // 성공 메시지 (선택사항)
      // alert('제안서가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('제안서 저장 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`제안서 저장 중 오류가 발생했습니다: ${errorMessage}\n\n다시 시도해주세요.`);
    } finally {
      setIsSaving(false);
    }
  };

  // 취소
  const handleCancel = () => {
    if (hasChanges && !confirm('저장하지 않은 변경사항이 있습니다. 정말 취소하시겠습니까?')) {
      return;
    }

    if (editableRef.current && originalContent) {
      editableRef.current.innerHTML = originalContent;
    }

    setIsEditing(false);
    setHasChanges(false);
    setOriginalContent('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isEditing) {
                handleCancel();
              }
              onBack();
            }}
            icon={<ChevronLeft size={16} />}
            className="mb-2 text-sm"
          >
            대시보드로 돌아가기
          </Button>
          <h1 className="text-3xl font-black text-gray-900">{proposal?.projectName}</h1>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                icon={<X size={18} />}
                className="flex-1 md:flex-none"
                disabled={isSaving}
              >
                취소
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                icon={<Save size={18} />}
                className="flex-1 md:flex-none"
                disabled={!hasChanges || isSaving}
              >
                {isSaving ? '저장 중...' : '저장'}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                icon={<Download size={18} />}
                className="flex-1 md:flex-none"
                onClick={handlePrint}
              >
                PDF 다운로드
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Edit size={18} />}
                className="flex-1 md:flex-none"
                onClick={handleEdit}
              >
                편집
              </Button>
              {proposal && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onRegenerate(proposal.id, proposal)}
                  icon={<RefreshCw size={18} />}
                  className="flex-1 md:flex-none"
                >
                  AI 다시 생성
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="mb-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-center text-sm text-gray-500">
          <p>💡 텍스트를 클릭하여 직접 수정할 수 있습니다.</p>
          {hasChanges && <p className="mt-1 font-medium text-indigo-600">변경사항이 있습니다.</p>}
        </div>
      )}

      {/* 화면 표시용 body 내용만 (PDF 다운로드용으로도 사용) */}
      <div
        ref={contentRef}
        className={`min-h-[800px] rounded-[2.5rem] border bg-white p-8 shadow-2xl md:p-16 ${
          isEditing ? 'border-2 border-indigo-300 ring-2 ring-indigo-100' : 'border-gray-50'
        }`}
      >
        {bodyContent ? (
          <>
            {isEditing ? (
              <div
                ref={editableRef}
                contentEditable={true}
                onInput={handleContentChange}
                className="prose prose-indigo max-w-none outline-none focus:outline-none"
                style={{
                  minHeight: '600px',
                }}
              />
            ) : (
              <div
                className="prose prose-indigo max-w-none"
                dangerouslySetInnerHTML={{ __html: bodyContent }}
              />
            )}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-gray-400">
            <p className="font-medium">내용을 불러오는 중입니다...</p>
          </div>
        )}
      </div>
    </div>
  );
}
