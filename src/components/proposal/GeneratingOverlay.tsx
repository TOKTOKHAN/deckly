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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] p-10 max-w-md w-full shadow-2xl text-center border border-gray-100">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle2 className="text-indigo-600" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-black mb-2">AI 제안서 생성 중</h2>
        <p className="text-gray-500 text-sm mb-8">
          전사록을 분석하여 최적의 제안 시나리오를 구성하고 있습니다. 잠시만 기다려주세요.
        </p>
        <ProgressBar progress={genStatus.progress} message={genStatus.message} />
      </div>
    </div>
  );
}
