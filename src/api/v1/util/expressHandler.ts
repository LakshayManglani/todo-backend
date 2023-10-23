import express from 'express';

type ExpressFunction = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

function createExpressHandler(fn: ExpressFunction) {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    return Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
}

export default createExpressHandler;
