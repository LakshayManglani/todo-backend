import { create, deleteAll, deleteById, getAll } from '../models/todo.model';
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
    return;
  }

  res
    .status(201)
    .json(new ApiResponse(201, data, 'Todo created successfully', true));
});

const getAllTodos = createExpressHandler(async (req, res) => {
  const data = await getAll();
  if (data.length === 0) {
    res
      .status(200)
      .json(new ApiResponse(200, data, 'Data does not exist', true));
    return;
  }
  res
    .status(200)
    .json(new ApiResponse(200, data, 'Data get successfully', true));
});

const getTodoById = createExpressHandler(async (req, res) => {});

const updateTodoById = createExpressHandler(async (req, res) => {});

const deleteTodoById = createExpressHandler(async (req, res) => {
  try {
    let { todoId } = req.params;

    const data = await deleteById(Number(todoId));

    if (data === 0) {
      res
        .status(400)
        .json(
          new ApiResponse(400, null, `Todo with ID ${todoId} not found.`, false)
        );
      return;
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          204,
          { deletedRows: data },
          'Data deleted successfully',
          true
        )
      );
  } catch (error) {
    console.error('Failed to deleteTodoById:', error);

    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          'An error occured while deleting the todo',
          false
        )
      );
  }
});

const deleteAllTodos = createExpressHandler(async (req, res) => {
  const data = await deleteAll();

  if (data === 0) {
    res
      .status(200)
      .json(
        new ApiResponse(204, { deletedRows: data }, 'Data does not exist', true)
      );
    return;
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        204,
        { deletedRows: data },
        'Data deletd successfully',
        true
      )
    );
});

const toggleTodoDoneStatus = createExpressHandler(async (req, res) => {});

export {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  toggleTodoDoneStatus,
  deleteAllTodos,
};
