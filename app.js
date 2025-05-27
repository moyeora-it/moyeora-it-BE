import express from 'express';
import userRouter from './router/userRouter.js';
import followRouter from './router/followRouter.js';
import ratingRouter from './router/ratingRouter.js';
import { swaggerSpec, swaggerUi } from './swagger/swagger.js';
import authRouter from './router/authRouter.js';

const app = express();

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
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
