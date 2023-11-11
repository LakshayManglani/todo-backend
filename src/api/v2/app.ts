import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import createExpressErrorHandler from './util/expressErrorHandler';
import ApiError from './util/apiError';
import userRouter from './routes/user.routing';
import todoRouter from './routes/todo.routing';

const app = express();

function startApp(app: any) {
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // Parse the cookie
  app.use(cookieParser());

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

  app.use(
    session({
      secret: String(process.env.EXPRESS_SESSION_SECRET),
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  // api of user
  app.use('/api/v2/users', userRouter());

  // api of todo
  app.use('/api/v2/todos', todoRouter());
}

export { startApp };
export default app;
