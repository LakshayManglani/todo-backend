import express, { NextFunction, Request, Response } from 'express';

type ExpressFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

function createExpressHandler(fn: ExpressFunction) {
  return fn;
}

export default createExpressHandler;
