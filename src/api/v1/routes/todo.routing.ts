import { Router } from 'express';
import {
  createTodoValidator,
  todoByIdValidator,
} from '../validators/todo.validator';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  deleteAllTodos,
  updateTodoById,
  deleteTodoById,
  toggleTodoDoneStatus,
} from '../controllers/todo.controller';

function todoRouter() {
  const router = Router();

  // TODO: Create validator for all this HTTP methods

  router
    .route('/')
    .post(createTodoValidator, createTodo)
    .get(getAllTodos)
    .delete(deleteAllTodos);

  router
    .route('/:todoId')
    .get(todoByIdValidator, getTodoById)
    .patch(updateTodoById)
    .delete(todoByIdValidator, deleteTodoById);

  router
    .route('/toogle/status/:todoId')
    .patch(todoByIdValidator, toggleTodoDoneStatus);

  return router;
}

export default todoRouter;
