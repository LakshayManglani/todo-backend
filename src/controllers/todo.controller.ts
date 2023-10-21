import { create } from '../models/todo.model';
import createExpressHandler from '../util/expressHandler';

// TODO Complete all the below todo functions

const createTodo = createExpressHandler(async (req, res) => {
  const { title, description } = req.body as {
    title: string;
    description: string;
  };

  const data = await create(title, description);
  if (!data) {
    throw new Error('\nFailed to create todo');
  }

  res.status(201).json({
    statusCode: 201,
    data: data,
    message: 'Todo created successfully',
    success: true,
  });
});

const getAllTodos = createExpressHandler(async (req, res) => {});

const getTodoById = createExpressHandler(async (req, res) => {});

const updateTodo = createExpressHandler(async (req, res) => {});

const deleteTodo = createExpressHandler(async (req, res) => {});

const toggleTodoDoneStatus = createExpressHandler(async (req, res) => {});

export {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  toggleTodoDoneStatus,
};
