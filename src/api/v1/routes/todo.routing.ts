import { Router } from 'express';
import {
  createTodoValidator,
  todoByIdValidator,
  updateTodoValidator,
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

  router
    .route('/')
    .post(createTodoValidator, createTodo)
    .get(getAllTodos)
    .delete(deleteAllTodos);

  router
    .route('/:todoId')
    .get(todoByIdValidator, getTodoById)
    .patch(updateTodoById, updateTodoById)
    .delete(todoByIdValidator, deleteTodoById);

  router
    .route('/toogle/status/:todoId')
    .patch(todoByIdValidator, toggleTodoDoneStatus);

  return router;
}

export default todoRouter;
