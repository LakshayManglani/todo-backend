import express from 'express';
import cors from 'cors';
import router from './routes/todo.routing';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use('/api/v1/todos', router);

export default app;
