import express from 'express';
import cors from 'cors';
import createExpressErrorHandler from './v2/util/expressErrorHandler';
import ApiError from './v2/util/apiError';

// api v1
import todoRouterV1 from './v1/routes/todo.routing';

// api v2
import userRouterV2 from './v2/routes/user.routing';
import todoRouterV2 from './v2/routes/todo.routing';
import { apiV1, apiV2 } from './constants';

const app = express();

function startApp() {
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

  // api v2

  // api of todo
  if (apiV1) {
    app.use('/api/v1/todos', todoRouterV1());
  }

  // api v2
  if (apiV2) {
    // api of user
    app.use('/api/v2/user', userRouterV2());

    // api of todo
    app.use('/api/v2/todos', todoRouterV2());
  }
}

export { startApp };
export default app;
