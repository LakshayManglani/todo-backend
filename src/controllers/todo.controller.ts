import createExpressHandler from '../util/expressHandler';

const getAllTodos = createExpressHandler((req, res) => {
  res.status(200).json({ message: 'Get all todos.' });
});

export { getAllTodos };
