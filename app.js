import express from 'express';
import userRouter from './router/userRouter.js';
import followRouter from './router/followRouter.js';

const app = express();

app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/follow', followRouter);
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
