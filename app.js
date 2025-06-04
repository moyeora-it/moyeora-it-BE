import express from 'express';
import userRouter from './router/userRouter.js';
import followRouter from './router/followRouter.js';
import ratingRouter from './router/ratingRouter.js';
import notificationRouter from './router/notificationRouter.js';
import { swaggerSpec, swaggerUi } from './swagger/swagger.js';
import authRouter from './router/authRouter.js';
import socket from './config/socket.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1',
      'https://localhost:3000',
      'https://127.0.0.1:3000',
      'https://my.sjcpop.com',
      'https://www.my.sjcpop.com',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/follow', followRouter);
app.use('/api/v1/rating', ratingRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/notification', notificationRouter);
app.use(
  '/api/v1/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://my.sjcpop.com',
      'http://www.my.sjcpop.com',
      'https://my.sjcpop.com',
      'https://www.my.sjcpop.com',
      'http://127.0.0.1:3000',
      'https://127.0.0.1:3000',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  },
  transports: ['websocket', 'polling'],
  path: '/socket.io/',
  allowEIO4: true,
});

socket(io);
app.set('io', io);

server.listen(3001, () => {
  console.log(`🏇${app.get('port')}에서 서버가 실행중입니다!🚴🏻  `);
});
