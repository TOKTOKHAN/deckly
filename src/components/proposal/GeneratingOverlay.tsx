import { GenerationStatus } from '@/types/proposal';
import ProgressBar from '@/components/ui/ProgressBar';
import { CheckCircle2 } from '@/components/icons';

interface GeneratingOverlayProps {
  isGenerating: boolean;
  genStatus: GenerationStatus;
}

export default function GeneratingOverlay({ isGenerating, genStatus }: GeneratingOverlayProps) {
  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[2rem] border border-gray-100 bg-white p-10 text-center shadow-2xl">
        <div className="relative mx-auto mb-8 h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle2 className="text-indigo-600" size={32} />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-black">AI 제안서 생성 중</h2>
        <p className="mb-8 text-sm text-gray-500">
          전사록을 분석하여 최적의 제안 시나리오를 구성하고 있습니다. 잠시만 기다려주세요.
        </p>
        <ProgressBar progress={genStatus.progress} message={genStatus.message} />
      </div>
    </div>
  );
}
