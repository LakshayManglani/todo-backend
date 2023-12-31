import express from 'express';
import cors from 'cors';
import createExpressErrorHandler from './util/expressErrorHandler';
import ApiError from './util/apiError';
import todoRouter from './routes/todo.routing';

const app = express();

function startApp(app: any) {
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
          .json(
            new ApiError(400, { name, message }, false, 'Invalid JSON syntax')
          );
        return;
      }
    })
  );

  // api of todo
  app.use('/api/v1/todos', todoRouter());
}

export { startApp };
export default app;
