import { create, deleteAll, deleteById, getAll } from '../models/todo.model';
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
  } catch (error) {
    console.error('Failed to createTodo:', error);

    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          'An error occured while creating the todo',
          false
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
  } catch (error) {
    console.error('Failed to getAllTodos:', error);

    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          'An error occured while getting all the todos',
          false
        )
      );
  }
});

const getTodoById = createExpressHandler(async (req, res) => {});

const updateTodoById = createExpressHandler(async (req, res) => {});

const deleteTodoById = createExpressHandler(async (req, res) => {
  try {
    let { todoId } = req.params;
    todoId = todoId.replace(':', '');

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
  } catch (error) {
    console.error('Failed to deleteTodoById:', error);

    res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          'An error occured while deleting all the todos',
          false
        )
      );
  }
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
