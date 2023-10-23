import express from 'express';
import cors from 'cors';
import router from './routes/todo.routing';
import createExpressErrorHandler from './util/expressErrorHandler';
import ApiError from './util/apiError';

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Parse the request body data into json format
app.use(express.json());

// Then check for JSON syntax error
app.use(
  createExpressErrorHandler((err, req, res, next) => {
    if (err) {
      const { name, message } = err;

      res
        .status(400)
        .json(new ApiError(400, 'Invalid JSON syntax', { name, message }));
      return;
    }
  })
);

// api of todo
app.use('/api/v1/todos', router);

export default app;
