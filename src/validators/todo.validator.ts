import { body } from 'express-validator';
import validate from '../util/validate';

const createTodoValidator = validate([
  body('title')
    .isString()
    .withMessage('Title must be of type string.')
    .trim()
    .notEmpty()
    .withMessage('Todo title is required and cannot be empty.'),
  body('description').optional(),
  body('description')
    .isString()
    .withMessage('Desciption must be of type string.'),
]);

export { createTodoValidator };
