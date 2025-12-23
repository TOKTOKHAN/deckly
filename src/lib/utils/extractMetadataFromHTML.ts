/**
  HTML 콘텐츠에서 제안서 메타데이터(제목, 클라이언트명)를 추출하는 유틸 함수
  @param htmlContent HTML 문자열
  @returns 추출된 메타데이터 (projectName, clientCompanyName)
 */
export function extractMetadataFromHTML(htmlContent: string): {
  projectName?: string;
  clientCompanyName?: string;
} {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // 제목 추출: 첫 번째 h1 태그 또는 표지의 h1
    const h1Element = doc.querySelector('h1');
    const projectName = h1Element?.textContent?.trim() || undefined;

    // 클라이언트명 추출: 표지의 두 번째 p 태그 (TOKTOKHAN.DEV 다음)
    // 또는 "클라이언트사" 관련 텍스트 찾기
    const allPElements = doc.querySelectorAll('p');
    let clientCompanyName: string | undefined;

    // 표지 영역에서 클라이언트명 찾기 (a4-page 첫 번째 div 내부)
    const coverPage = doc.querySelector('.a4-page');
    if (coverPage) {
      const coverPElements = coverPage.querySelectorAll('p');
      // TOKTOKHAN.DEV 다음에 오는 p 태그 찾기
      let foundToktokhan = false;
      Array.from(coverPElements).forEach(p => {
        if (p.textContent?.includes('TOKTOKHAN.DEV')) {
          foundToktokhan = true;
        } else if (foundToktokhan && p.textContent?.trim() && !clientCompanyName) {
          clientCompanyName = p.textContent.trim();
        }
      });
    }

    // 대체 방법: 모든 p 태그에서 클라이언트사 정보 찾기
    if (!clientCompanyName) {
      Array.from(allPElements).forEach(p => {
        const text = p.textContent?.trim() || '';
        // TOKTOKHAN.DEV가 아니고, 회사명처럼 보이는 텍스트 찾기
        if (
          text &&
          !text.includes('TOKTOKHAN') &&
          !text.includes('제안서') &&
          !text.includes('미팅') &&
          text.length > 0
        ) {
          // 첫 번째 의미있는 p 태그를 클라이언트명으로 간주
          if (!clientCompanyName && text.length < 50) {
            clientCompanyName = text;
          }
        }
      });
    }

    return { projectName, clientCompanyName };
  } catch (error) {
    console.error('HTML에서 메타데이터 추출 오류:', error);
    return {};
  }
}
