import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger API - BE 김민수',
      version: '1.0.0',
    },
    tags: [
      { name: 'User', description: '사용자 관련 API' },
      { name: 'Follow', description: '팔로우 관련 API' },
      { name: 'Rating', description: '평점 관련 API' },
      { name: 'Auth', description: '인증 관련 API' },
    ],
  },
  apis: ['./router/*.js'], // 라우터 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
