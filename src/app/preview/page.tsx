'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import {
  generateCoverTemplate,
  generateTableOfContentsTemplate,
  generateConclusionTemplate,
  generateBodySection1Template,
  generateBodySection2Template,
  generateBodySection3Template,
  generateBodySection4Template,
  generateBodySection5Template,
  generateHTMLWrapper,
  TemplateData,
  BodySection1Data,
  BodySection2Data,
  BodySection3Data,
  BodySection4Data,
  BodySection5Data,
} from '@/lib/gemini/templates';
import clientLogo from '../../../public/images/Domino_pizza_logo.svg';

export default function PreviewPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<
    'cover' | 'toc' | 'conclusion' | 'body1' | 'body2' | 'body3' | 'body4' | 'body5' | 'all'
  >('all');
  const printIframeRef = useRef<HTMLIFrameElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 브랜드 컬러 상태 관리
  const [brandColor1, setBrandColor1] = useState('#4f46e5');
  const [brandColor2, setBrandColor2] = useState('#1f2937');
  const [brandColor3, setBrandColor3] = useState('#0a0c10');

  const sampleData: TemplateData = useMemo(
    () => ({
      projectName: '사업제안서 자동화 플랫폼',
      clientCompanyName: `Domino's Pizza`,
      brandColor1,
      brandColor2,
      brandColor3,
      clientLogo: clientLogo.src as string,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
    }),
    [brandColor1, brandColor2, brandColor3],
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
          content = generateTableOfContentsTemplate(
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          break;
        case 'conclusion':
          content = generateConclusionTemplate(sampleData);
          break;
        case 'body1':
          const bodySection1Data: BodySection1Data = {
            background: {
              quote:
                '디지털 트랜스포메이션을 통한 고객 경험의 혁신적 재설계 및 시장 경쟁 우위 확보',
              marketBackground:
                '경쟁사의 공격적인 디지털 전환에 대응하고 차별화된 피자 주문 경험을 제공해야 할 시점입니다.',
              primaryGoal:
                '사용자 데이터 기반의 개인화 추천과 심리스한 결제 프로세스 구축으로 구매 전환율을 극대화합니다.',
            },
            scope: ['UI/UX Renewal', 'Platform Core Dev', 'Back-office System'],
            strengths: [
              { title: 'Specialized Skill', description: '국내 최고 수준의\n푸드테크 기술력' },
              { title: 'Proven Track', description: '다수의 대형 플랫폼\n수행 실적 보유' },
              { title: 'Scalable Tech', description: '확장 가능한\n클라우드 아키텍처' },
            ],
          };
          content = generateBodySection1Template(
            bodySection1Data,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          break;
        case 'body2':
          const bodySection2Data: BodySection2Data = {
            marketAnalysis: {
              trends: [
                '비대면 주문 채널 고도화',
                'AI 기반 최적 배차 시스템',
                '구독형 모델을 통한 고객 락인',
              ],
              coreValue: 'CX-CENTRIC',
            },
            targetModel: {
              legacy: 'LEGACY',
              target: "Intelligent Domino's Hub",
              nextGen: 'NEXT-GEN',
            },
            strategies: [
              '사용자 중심 UI/UX 전면 개편',
              '클라우드 기반 서버 안정성 확보',
              '마케팅 오토메이션 도구 통합',
            ],
            benefits: {
              conversion: '+25%',
              churnRate: '-40%',
            },
          };
          content = generateBodySection2Template(
            bodySection2Data,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          break;
        case 'body3':
          const bodySection3Data: BodySection3Data = {
            architecture: {
              frontend: ['Mobile App', 'Web Platform'],
              coreHub: 'CORE HUB',
              backend: ['Microservices', 'Scalable DB'],
            },
            features: [
              '반응형 웹 및 하이브리드 앱 고도화',
              'AI 기반 스마트 주문 시스템 연동',
              '실시간 배달 트래킹 GPS 인터페이스',
            ],
            security: ['End-to-End 데이터 암호화', 'WAF 및 DDoS 방어 체계 구축'],
            integrations: ['POS SYSTEM', 'CRM', 'ERP', '3RD PARTY API'],
          };
          content = generateBodySection3Template(
            bodySection3Data,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          break;
        case 'body4':
          const bodySection4Data: BodySection4Data = {
            timeline: [
              {
                period: 'M1',
                title: 'Planning & Analysis',
                description: '요구사항 분석, WBS 확정',
              },
              {
                period: 'M2',
                title: 'UI/UX & Prototype',
                description: '가이드라인 수립, 메인 디자인',
              },
              {
                period: 'M3-M5',
                title: 'Development',
                description: '프론트/백엔드 개발, 단위 테스트',
              },
              {
                period: 'M6',
                title: 'Verification & Launch',
                description: '통합 테스트, QA, 최종 오픈',
              },
            ],
            resources: [
              { role: 'Project Manager', name: 'Domino Expert' },
              { role: 'Lead Developer', name: 'Domino Expert' },
              { role: 'UX/UI Designer', name: 'Domino Expert' },
              { role: 'QA Engineer', name: 'Domino Expert' },
            ],
            methodology: {
              title: '"Scrum & Sprint 기반"',
              description:
                '지속적인 피드백과 점진적 기능 구현으로 변화하는 요구사항에 유연하게 대응합니다.',
            },
            qualityAssurance: ['정기 단위 테스트', '사용자 시나리오 검증', '부하 테스트 실시'],
          };
          content = generateBodySection4Template(
            bodySection4Data,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
            sampleData.startDate,
            sampleData.endDate,
          );
          break;
        case 'body5':
          const bodySection5Data: BodySection5Data = {
            training: [
              '관리자 기능 매뉴얼 및 가이드 배포',
              '현업 담당자 대상 시스템 활용 교육(2회)',
              '데이터 분석 및 마케팅 툴 활용 워크숍',
            ],
            knowledgeTransfer:
              '"모든 소스코드 및 인프라 설계 문서를 제공하며, 자체 운영 역량 내재화를 적극 지원합니다."',
            maintenance: [
              { title: '24/7 Monitoring', description: '상시 모니터링 체계 가동' },
              { title: 'Regular Updates', description: '보안 취약점 점검 및 패치' },
              { title: 'Help Desk', description: '전담 기술 지원 헬프데스크' },
            ],
            emergency: {
              title: '장애 발생 시 30분 내 초동 조치 보장',
              description: '에스컬레이션 경로 수립을 통한 무중단 비즈니스 연속성 확보',
              badge: 'DR System Active',
            },
          };
          content = generateBodySection5Template(
            bodySection5Data,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          break;
        case 'all':
          const cover = await generateCoverTemplate(sampleData);
          const toc = generateTableOfContentsTemplate(
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          const bodySection1DataAll: BodySection1Data = {
            background: {
              quote:
                '디지털 트랜스포메이션을 통한 고객 경험의 혁신적 재설계 및 시장 경쟁 우위 확보',
              marketBackground:
                '경쟁사의 공격적인 디지털 전환에 대응하고 차별화된 피자 주문 경험을 제공해야 할 시점입니다.',
              primaryGoal:
                '사용자 데이터 기반의 개인화 추천과 심리스한 결제 프로세스 구축으로 구매 전환율을 극대화합니다.',
            },
            scope: ['UI/UX Renewal', 'Platform Core Dev', 'Back-office System'],
            strengths: [
              { title: 'Specialized Skill', description: '국내 최고 수준의\n푸드테크 기술력' },
              { title: 'Proven Track', description: '다수의 대형 플랫폼\n수행 실적 보유' },
              { title: 'Scalable Tech', description: '확장 가능한\n클라우드 아키텍처' },
            ],
          };
          const bodySection2DataAll: BodySection2Data = {
            marketAnalysis: {
              trends: [
                '비대면 주문 채널 고도화',
                'AI 기반 최적 배차 시스템',
                '구독형 모델을 통한 고객 락인',
              ],
              coreValue: 'CX-CENTRIC',
            },
            targetModel: {
              legacy: 'LEGACY',
              target: "Intelligent Domino's Hub",
              nextGen: 'NEXT-GEN',
            },
            strategies: [
              '사용자 중심 UI/UX 전면 개편',
              '클라우드 기반 서버 안정성 확보',
              '마케팅 오토메이션 도구 통합',
            ],
            benefits: {
              conversion: '+25%',
              churnRate: '-40%',
            },
          };
          const bodySection3DataAll: BodySection3Data = {
            architecture: {
              frontend: ['Mobile App', 'Web Platform'],
              coreHub: 'CORE HUB',
              backend: ['Microservices', 'Scalable DB'],
            },
            features: [
              '반응형 웹 및 하이브리드 앱 고도화',
              'AI 기반 스마트 주문 시스템 연동',
              '실시간 배달 트래킹 GPS 인터페이스',
            ],
            security: ['End-to-End 데이터 암호화', 'WAF 및 DDoS 방어 체계 구축'],
            integrations: ['POS SYSTEM', 'CRM', 'ERP', '3RD PARTY API'],
          };
          const bodySection4DataAll: BodySection4Data = {
            timeline: [
              {
                period: 'M1',
                title: 'Planning & Analysis',
                description: '요구사항 분석, WBS 확정',
              },
              {
                period: 'M2',
                title: 'UI/UX & Prototype',
                description: '가이드라인 수립, 메인 디자인',
              },
              {
                period: 'M3-M5',
                title: 'Development',
                description: '프론트/백엔드 개발, 단위 테스트',
              },
              {
                period: 'M6',
                title: 'Verification & Launch',
                description: '통합 테스트, QA, 최종 오픈',
              },
            ],
            resources: [
              { role: 'Project Manager', name: 'Domino Expert' },
              { role: 'Lead Developer', name: 'Domino Expert' },
              { role: 'UX/UI Designer', name: 'Domino Expert' },
              { role: 'QA Engineer', name: 'Domino Expert' },
            ],
            methodology: {
              title: '"Scrum & Sprint 기반"',
              description:
                '지속적인 피드백과 점진적 기능 구현으로 변화하는 요구사항에 유연하게 대응합니다.',
            },
            qualityAssurance: ['정기 단위 테스트', '사용자 시나리오 검증', '부하 테스트 실시'],
          };
          const bodySection5DataAll: BodySection5Data = {
            training: [
              '관리자 기능 매뉴얼 및 가이드 배포',
              '현업 담당자 대상 시스템 활용 교육(2회)',
              '데이터 분석 및 마케팅 툴 활용 워크숍',
            ],
            knowledgeTransfer:
              '"모든 소스코드 및 인프라 설계 문서를 제공하며, 자체 운영 역량 내재화를 적극 지원합니다."',
            maintenance: [
              { title: '24/7 Monitoring', description: '상시 모니터링 체계 가동' },
              { title: 'Regular Updates', description: '보안 취약점 점검 및 패치' },
              { title: 'Help Desk', description: '전담 기술 지원 헬프데스크' },
            ],
            emergency: {
              title: '장애 발생 시 30분 내 초동 조치 보장',
              description: '에스컬레이션 경로 수립을 통한 무중단 비즈니스 연속성 확보',
              badge: 'DR System Active',
            },
          };
          const body1 = generateBodySection1Template(
            bodySection1DataAll,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          const body2 = generateBodySection2Template(
            bodySection2DataAll,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          const body3 = generateBodySection3Template(
            bodySection3DataAll,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          const body4 = generateBodySection4Template(
            bodySection4DataAll,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
            sampleData.startDate,
            sampleData.endDate,
          );
          const body5 = generateBodySection5Template(
            bodySection5DataAll,
            sampleData.brandColor1,
            sampleData.brandColor2,
            sampleData.brandColor3,
          );
          const conclusion = generateConclusionTemplate(sampleData);
          content = cover + toc + body1 + body2 + body3 + body4 + body5 + conclusion;
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

          {/* 브랜드 컬러 입력 필드 */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">브랜드 컬러 설정</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Primary Color (주요 강조)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandColor1}
                    onChange={e => setBrandColor1(e.target.value)}
                    className="h-10 w-20 cursor-pointer rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={brandColor1}
                    onChange={e => setBrandColor1(e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
                    placeholder="#4f46e5"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Secondary Color (카드 배경)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandColor2}
                    onChange={e => setBrandColor2(e.target.value)}
                    className="h-10 w-20 cursor-pointer rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={brandColor2}
                    onChange={e => setBrandColor2(e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
                    placeholder="#1f2937"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tertiary Color (경계선/미묘한 배경)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandColor3}
                    onChange={e => setBrandColor3(e.target.value)}
                    className="h-10 w-20 cursor-pointer rounded border border-gray-300"
                  />
                  <input
                    type="text"
                    value={brandColor3}
                    onChange={e => setBrandColor3(e.target.value)}
                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
                    placeholder="#0a0c10"
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              💡 브랜드 컬러를 변경하면 템플릿에 실시간으로 반영됩니다.
            </p>
          </div>

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
              onClick={() => setSelectedTemplate('body1')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'body1'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              본문 섹션 1
            </button>
            <button
              onClick={() => setSelectedTemplate('body2')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'body2'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              본문 섹션 2
            </button>
            <button
              onClick={() => setSelectedTemplate('body3')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'body3'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              본문 섹션 3
            </button>
            <button
              onClick={() => setSelectedTemplate('body4')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'body4'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              본문 섹션 4
            </button>
            <button
              onClick={() => setSelectedTemplate('body5')}
              className={`rounded-lg px-4 py-2 font-medium transition ${
                selectedTemplate === 'body5'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              본문 섹션 5
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
