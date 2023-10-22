import { Router } from 'express';
import { createTodoValidator } from '../validators/todo.validator';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  deleteAllTodos,
  updateTodo,
  deleteTodo,
  toggleTodoDoneStatus,
} from '../controllers/todo.controller';

const router = Router();

// TODO: Create validator for all this HTTP methods

router
  .route('/')
  .post(createTodoValidator, createTodo)
  .get(getAllTodos)
  .delete(deleteAllTodos);

router.route('/:todoId').get(getTodoById).patch(updateTodo).delete(deleteTodo);

router.route('/toogle/status/:todoId').patch(toggleTodoDoneStatus);

export default router;
