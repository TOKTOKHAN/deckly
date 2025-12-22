'use client';

import { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
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

export default function ResultView({ proposal, onBack, onRegenerate, onUpdate }: ResultViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const editableRef = useRef<HTMLDivElement>(null);

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [originalContent, setOriginalContent] = useState<string>('');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: proposal?.projectName || '제안서',
    onBeforePrint: async () => {
      if (!contentRef.current) {
        throw new Error('인쇄할 내용이 없습니다.');
      }
    },
  });

  // 편집 모드 진입
  const handleEdit = () => {
    if (!proposal?.content) return;

    setOriginalContent(proposal.content);
    setIsEditing(true);
    setHasChanges(false);
  };

  // 편집 모드 진입 시 HTML 설정
  useEffect(() => {
    if (isEditing && editableRef.current && proposal?.content) {
      // contentEditable이 활성화된 후 HTML 설정
      editableRef.current.innerHTML = proposal.content;
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
  }, [isEditing, proposal?.content]);

  // 편집 내용 변경 감지
  const handleContentChange = () => {
    if (!editableRef.current || !originalContent) return;

    const currentContent = editableRef.current.innerHTML;
    setHasChanges(currentContent !== originalContent);
  };

  // 저장
  const handleSave = async () => {
    if (!editableRef.current || !proposal) return;

    const updatedContent = editableRef.current.innerHTML;
    setIsSaving(true);

    try {
      // HTML에서 제목과 클라이언트명 추출
      const extractedMetadata = extractMetadataFromHTML(updatedContent);

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

      <div
        ref={contentRef}
        className={`bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl border min-h-[800px] ${
          isEditing ? 'border-indigo-300 border-2 ring-2 ring-indigo-100' : 'border-gray-50'
        }`}
      >
        {proposal?.content ? (
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
                dangerouslySetInnerHTML={{ __html: proposal.content }}
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
