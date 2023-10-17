import { Request, Response } from 'express';

// TODO: Create a util function which has types for req and res so that we can use it without giving type evertime.
function getAllTodos(req: Request, res: Response) {
  res.status(200).json({ message: 'From todo controller.' });
}

export { getAllTodos };
