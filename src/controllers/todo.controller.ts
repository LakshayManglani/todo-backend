import { create, getAll } from '../models/todo.model';
import ApiResponse from '../util/apiResponse';
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

  res
    .status(201)
    .json(new ApiResponse(201, data, 'Todo created successfully', true));
});

const getAllTodos = createExpressHandler(async (req, res) => {
  const data = await getAll();
  if (!data) {
    throw new Error('\nNo Data Found');
  }
  res
    .status(200)
    .json(new ApiResponse(200, data, 'Data get successfully', true));
});

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
