import {
  create,
  deleteAll,
  deleteById,
  getAll,
  getById,
  toggleIsCompleteById,
} from '../models/todo.model';
import ApiError from '../util/apiError';
import ApiResponse from '../util/apiResponse';
import createExpressHandler from '../util/expressHandler';

// TODO Complete all the below todo functions

const createTodo = createExpressHandler(async (req, res) => {
  try {
    const { title, description } = req.body as {
      title: string;
      description: string;
    };

    const data = await create(title, description);

    res
      .status(201)
      .json(new ApiResponse(201, data, 'Todo created successfully', true));
  } catch (error: any) {
    console.error('Failed to createTodo:', error);
    const { name, message } = error;
    res
      .status(500)
      .json(
        new ApiError(
          500,
          { name, message },
          false,
          'An error occured while creating the todo'
        )
      );
  }
});

const getAllTodos = createExpressHandler(async (req, res) => {
  try {
    const data = await getAll();

    res
      .status(200)
      .json(new ApiResponse(200, data, 'Data get successfully', true));
  } catch (error: any) {
    console.error('Failed to getAllTodos:', error);
    const { name, message } = error;
    res
      .status(500)
      .json(
        new ApiError(
          500,
          { name, message },
          false,
          'An error occured while getting all the todos'
        )
      );
  }
});

const getTodoById = createExpressHandler(async (req, res) => {
  try {
    let { todoId } = req.params;

    const data = await getById(Number(todoId));

    if (!data) {
      res
        .status(404)
        .json(
          new ApiResponse(404, null, `Todo with ID ${todoId} not found.`, false)
        );
      return;
    }

    res
      .status(200)
      .json(new ApiResponse(200, data, 'Data get successfully', true));
  } catch (error) {
    console.error('Failed to getTodoById:', error);

    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          'An error occured while getting the todo',
          false
        )
      );
  }
});

const updateTodoById = createExpressHandler(async (req, res) => {});

const deleteTodoById = createExpressHandler(async (req, res) => {
  try {
    let { todoId } = req.params;

    const data = await deleteById(Number(todoId));

    if (data === 0) {
      res
        .status(404)
        .json(
          new ApiResponse(404, null, `Todo with ID ${todoId} not found.`, false)
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
  } catch (error: any) {
    console.error('Failed to deleteTodoById:', error);
    const { name, message } = error;
    res
      .status(500)
      .json(
        new ApiError(
          500,
          { name, message },
          false,
          'An error occured while deleting the todo'
        )
      );
  }
});

const deleteAllTodos = createExpressHandler(async (req, res) => {
  try {
    const data = await deleteAll();

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
  } catch (error: any) {
    console.error('Failed to deleteTodoById:', error);

    const { name, message } = error;

    res
      .status(500)
      .json(
        new ApiError(
          500,
          { name, message },
          false,
          'An error occured while deleting all the todos'
        )
      );
  }
});

const toggleTodoDoneStatus = createExpressHandler(async (req, res) => {
  try {
    let { todoId } = req.params;

    const data = await toggleIsCompleteById(Number(todoId));

    if (data == 0) {
      res
        .status(404)
        .json(
          new ApiResponse(404, null, `Todo with ID ${todoId} not found.`, false)
        );
      return;
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { rowsUpdated: data },
          'isComplete toggle succesfully',
          true
        )
      );
  } catch (error: any) {
    console.error('Failed to getTodoById:', error);

    const { name, message } = error;

    res
      .status(500)
      .json(
        new ApiError(
          500,
          { name, message },
          false,
          'An error occured while deleting all the todos'
        )
      );
  }
});

export {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  toggleTodoDoneStatus,
  deleteAllTodos,
};
