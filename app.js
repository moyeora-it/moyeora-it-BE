import express from 'express';
import userRouter from './router/userRouter.js';
import followRouter from './router/followRouter.js';
import ratingRouter from './router/ratingRouter.js';
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
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/follow', followRouter);
app.use('/api/v1/rating', ratingRouter);
app.use('/api/v1/auth', authRouter);
app.use(
  '/api/v1/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  path: '/socket.io/',
  allowEIO4: true,
});

socket(io);

server.listen(3001, () => {
  console.log(`🏇${app.get('port')}에서 서버가 실행중입니다!🚴🏻  `);
});
