import { body } from 'express-validator';
import validate from '../util/validate';

const createTodoValidator = validate([
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Todo title is required and cannot be empty.'),
  body('description').optional(),
]);

export { createTodoValidator };
