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

// FIXME: Handle JSON Syntax Error. If request gets JSON with syntax error then send a response with message: JSON syntax error

// Parse the request body data into json format
app.use(express.json());

// api of todo
app.use('/api/v1/todos', router);

export default app;
