import express from 'express';
import userRouter from './router/userRouter.js';

const app = express();

app.use(express.json());
app.use('/user', userRouter);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
