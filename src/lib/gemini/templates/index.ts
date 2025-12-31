/* 템플릿 모듈 중앙 export 파일 모든 템플릿 함수와 타입을 한 곳에서 re-export하여 외부에서 사용할 수 있도록 합니다. */
export * from './types';
export * from './constants';
export { generateCoverTemplate } from './cover-template';
export { generateTableOfContentsTemplate } from './toc-template';
export { generateConclusionTemplate } from './conclusion-template';
export { generateBodySection1Template } from './body-sections/section-1';
export { generateBodySection2Template } from './body-sections/section-2';
export { generateBodySection3Template } from './body-sections/section-3';
export { generateBodySection4Template } from './body-sections/section-4';
export { generateBodySection5Template } from './body-sections/section-5';
export { generateHTMLWrapper } from './html-wrapper';
