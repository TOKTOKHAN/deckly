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

  // 공통 스타일 적용 함수 (화면 표시 및 인쇄 모두에서 사용)
  const applyCommonStyles = (container: HTMLElement | null) => {
    if (!container) return;

    // 표지 페이지 찾기 (첫 번째 a4-page)
    const coverPage = container.querySelector('.a4-page:first-child') as HTMLElement | null;
    if (coverPage) {
      // 표지 배경 그라데이션 및 중앙 정렬 강제
      coverPage.style.background = 'linear-gradient(to bottom right, #4f46e5, #1f2937)';
      coverPage.style.color = 'white';
      coverPage.style.display = 'flex';
      coverPage.style.flexDirection = 'column';
      coverPage.style.alignItems = 'center';
      coverPage.style.justifyContent = 'center';
      coverPage.style.minHeight = '100vh';
      coverPage.style.padding = '0'; // 표지 패딩 제거
      coverPage.style.textAlign = 'center'; // 중앙 정렬 강제

      // 표지 내부 컨테이너 중앙 정렬
      const coverInnerDiv = coverPage.querySelector('div');
      if (coverInnerDiv) {
        (coverInnerDiv as HTMLElement).style.width = '100%';
        (coverInnerDiv as HTMLElement).style.display = 'flex';
        (coverInnerDiv as HTMLElement).style.flexDirection = 'column';
        (coverInnerDiv as HTMLElement).style.alignItems = 'center';
        (coverInnerDiv as HTMLElement).style.justifyContent = 'center';
        (coverInnerDiv as HTMLElement).style.textAlign = 'center';
      }

      // 표지 내부 모든 텍스트 요소 스타일 적용 (templates.ts와 동일하게)
      const coverH1 = coverPage.querySelector('h1');
      if (coverH1) {
        // templates.ts에서 인라인 스타일로 4.5rem 지정
        (coverH1 as HTMLElement).style.fontSize = '4.5rem';
        (coverH1 as HTMLElement).style.fontWeight = '900';
        (coverH1 as HTMLElement).style.color = 'white';
        (coverH1 as HTMLElement).style.marginBottom = '1rem';
        (coverH1 as HTMLElement).style.textAlign = 'center';
      }

      const coverH3 = coverPage.querySelector('h3');
      if (coverH3) {
        // templates.ts에서 인라인 스타일로 3rem 지정
        (coverH3 as HTMLElement).style.fontSize = '3rem';
        (coverH3 as HTMLElement).style.fontWeight = 'bold';
        (coverH3 as HTMLElement).style.color = 'white';
      }

      const coverParagraphs = coverPage.querySelectorAll('p');
      coverParagraphs.forEach(p => {
        const text = p.textContent || '';
        if (text.includes('TOKTOKHAN.DEV')) {
          // 이미 h3로 처리됨
        } else if (text.includes('제안서 작성일') || text.includes('미팅 일자')) {
          (p as HTMLElement).style.fontSize = '0.875rem';
          (p as HTMLElement).style.color = 'rgba(255, 255, 255, 0.8)';
          (p as HTMLElement).style.opacity = '0.8';
        } else {
          // 클라이언트사명 등
          (p as HTMLElement).style.fontSize = '1.5rem';
          (p as HTMLElement).style.color = 'rgba(255, 255, 255, 0.9)';
          (p as HTMLElement).style.opacity = '0.9';
        }
      });

      // 구분선 스타일
      const divider = coverPage.querySelector('[class*="border-t"]');
      if (divider) {
        (divider as HTMLElement).style.borderTop = '2px solid rgba(255, 255, 255, 0.3)';
        (divider as HTMLElement).style.width = '8rem';
        (divider as HTMLElement).style.margin = '2rem auto';
      }
    }

    // 끝마무리 페이지 찾기
    const allPages = container.querySelectorAll('.a4-page');
    const conclusionPage = Array.from(allPages).find(page => {
      const text = page.textContent || '';
      return text.includes('감사합니다');
    }) as HTMLElement | undefined;

    if (conclusionPage) {
      // 끝마무리 제목 스타일 적용
      const title = conclusionPage.querySelector('h2');
      if (title && title.textContent?.includes('감사합니다')) {
        (title as HTMLElement).style.fontSize = '2.25rem';
        (title as HTMLElement).style.fontWeight = 'bold';
        (title as HTMLElement).style.color = '#4f46e5';
        (title as HTMLElement).style.marginBottom = '2rem';
      }

      // 본문 텍스트 스타일 적용
      const paragraphs = conclusionPage.querySelectorAll('p');
      paragraphs.forEach(p => {
        const text = p.textContent || '';
        if (
          text.includes('성공적인 추진') ||
          text.includes('문의사항') ||
          text.includes('파트너')
        ) {
          (p as HTMLElement).style.fontSize = '1.5rem';
          (p as HTMLElement).style.fontWeight = '600';
          (p as HTMLElement).style.color = '#374151';
          (p as HTMLElement).style.lineHeight = '1.75rem';
        } else if (text.includes('TOKTOKHAN.DEV')) {
          (p as HTMLElement).style.fontSize = '2.25rem';
          (p as HTMLElement).style.fontWeight = 'bold';
          (p as HTMLElement).style.color = '#4f46e5';
          (p as HTMLElement).style.marginBottom = '1rem';
        } else if (text.includes('담당자')) {
          (p as HTMLElement).style.color = '#111827';
        }
      });

      // 구분선 스타일 적용
      const divider = conclusionPage.querySelector('[class*="border-t"]') as HTMLElement | null;
      if (divider) {
        divider.style.borderTop = '2px solid rgba(79, 70, 229, 0.2)';
        divider.style.marginTop = '3rem';
        divider.style.paddingTop = '2rem';
      }

      // 중앙 정렬 및 패딩 적용
      const centerDiv = conclusionPage.querySelector(
        '[class*="text-center"]',
      ) as HTMLElement | null;
      if (centerDiv) {
        centerDiv.style.textAlign = 'center';
        centerDiv.style.paddingTop = '4rem';
        centerDiv.style.paddingBottom = '4rem';
      }

      // 최상위 컨테이너 스타일도 확인
      const maxWidthDiv = conclusionPage.querySelector('[class*="max-w"]') as HTMLElement | null;
      if (maxWidthDiv) {
        maxWidthDiv.style.maxWidth = '56rem';
        maxWidthDiv.style.marginLeft = 'auto';
        maxWidthDiv.style.marginRight = 'auto';
      }
    }
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
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
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
        <div className="flex gap-2 w-full md:w-auto">
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
        <div className="mb-4 text-sm text-gray-500 text-center bg-indigo-50 border border-indigo-200 rounded-xl p-3">
          <p>💡 텍스트를 클릭하여 직접 수정할 수 있습니다.</p>
          {hasChanges && <p className="text-indigo-600 font-medium mt-1">변경사항이 있습니다.</p>}
        </div>
      )}

      {/* 화면 표시용 body 내용만 (PDF 다운로드용으로도 사용) */}
      <div
        ref={contentRef}
        className={`bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border min-h-[800px] ${
          isEditing ? 'border-indigo-300 border-2 ring-2 ring-indigo-100' : 'border-gray-50'
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
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="font-medium">내용을 불러오는 중입니다...</p>
          </div>
        )}
      </div>
    </div>
  );
}
