import {
  create,
  deleteAll,
  deleteById,
  getAll,
  getById,
  toggleIsCompleteById,
  updateById,
} from '../models/todo.model';
import ApiError from '../util/apiError';
import ApiResponse from '../util/apiResponse';
import createExpressHandler from '../util/expressHandler';

const createTodo = createExpressHandler(async (req, res) => {
  try {
    const { title, description, decodedUserId } = req.body as {
      title: string;
      description: string;
      decodedUserId: number;
    };

    const data = await create(title, description, decodedUserId);

    res
      .status(201)
      .json(new ApiResponse(201, data, 'Todo created successfully', true));
  } catch (error: any) {
    console.error('Failed to createTodo:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

const getAllTodos = createExpressHandler(async (req, res) => {
  try {
    const { decodedUserId } = req.body;

    const data = await getAll(decodedUserId);

    res
      .status(200)
      .json(new ApiResponse(200, data, 'Data get successfully', true));
  } catch (error: any) {
    console.error('Failed to getAllTodos:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

const getTodoById = createExpressHandler(async (req, res) => {
  try {
    const { todoId } = req.params;
    const { decodedUserId } = req.body;

    const data = await getById(Number(decodedUserId), Number(todoId));

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
  } catch (error: any) {
    console.error('Failed to getTodoById:', error);
    const { message } = error;
    res.status(500).json(new ApiError(500, null, false, message));
  }
});

const updateTodoById = createExpressHandler(async (req, res) => {
  try {
    const { todoId } = req.params;
    const { decodedUserId } = req.body;

    const { title, description } = req.body as {
      title: string;
      description: string;
    };

    const affectedRows = await updateById(
      Number(decodedUserId),
      Number(todoId),
      title,
      description
    );

    if (affectedRows === 0) {
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
          { affectedRows },
          'Todo updated successfully',
          true
        )
      );
  } catch (error: any) {
    console.error('Failed to updateTodoById:', error);
    res
      .status(500)
      .json(new ApiError(500, null, false, 'Failed to update the todo.'));
  }
});

const deleteTodoById = createExpressHandler(async (req, res) => {
  try {
    const { todoId } = req.params;
    const { decodedUserId } = req.body;

    const data = await deleteById(Number(decodedUserId), Number(todoId));

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
    const { message } = error;
    res.status(500).json(new ApiError(500, error, false, message));
  }
});

const deleteAllTodos = createExpressHandler(async (req, res) => {
  try {
    const { decodedUserId } = req.body;

    const data = await deleteAll(decodedUserId);

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

    const { message } = error;

    res.status(500).json(new ApiError(500, error, false, message));
  }
});

const toggleTodoDoneStatus = createExpressHandler(async (req, res) => {
  try {
    const { todoId } = req.params;
    const { decodedUserId } = req.body;

    const isComplete = await toggleIsCompleteById(
      Number(decodedUserId),
      Number(todoId)
    );

    if (isComplete === null) {
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
          { isComplete },
          'isComplete toggle succesfully',
          true
        )
      );
  } catch (error: any) {
    console.error('Failed to getTodoById:', error);

    const { message } = error;

    res.status(500).json(new ApiError(500, error, false, message));
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
