import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 80000,
});

// 요청 인터셉터 (필요시 사용)
apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // 서버가 응답했지만 에러 상태 코드
      const errorMessage =
        error.response.data?.error || `서버 오류가 발생했습니다. (${error.response.status})`;
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error('Network Error:', {
        message: error.message,
        code: error.code,
        request: error.request,
      });
      return Promise.reject(
        new Error(
          '서버에 연결할 수 없습니다. 개발 서버가 실행 중인지 확인해주세요. (localhost:3000)',
        ),
      );
    } else {
      // 요청 설정 중 에러
      console.error('Request Setup Error:', error);
      return Promise.reject(error);
    }
  },
);

export default apiClient;
