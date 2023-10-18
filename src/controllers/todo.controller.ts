import { getDatabases } from '../models/todo.model';
import createExpressHandler from '../util/expressHandler';

const getAllTodos = createExpressHandler(async (req, res) => {
  const data = await getDatabases();
  res.status(200).json(data);
});

export { getAllTodos };
