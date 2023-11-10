import { body, param } from 'express-validator';
import validate from './validate';

const createTodoValidator = validate([
  body('title')
    .isString()
    .withMessage('Title must be defined of type string.')
    .trim()
    .notEmpty()
    .withMessage('Todo title is required and cannot be empty.'),
  body('description')
    .isString()
    .withMessage('Todo Desciption must be of type string.'),
  body('decodedUserId')
    .notEmpty()
    .withMessage('User Id is required')
    .isInt()
    .withMessage('User Id must be type int.'),
]);

const todoByIdValidator = validate([
  param('todoId').isInt().withMessage('Todo Id must be type int'),
]);

const updateTodoValidator = validate([
  param('todoId').isInt().withMessage('Todo Id must be type int'),
  body('title')
    .isString()
    .withMessage('Title must be defined of type string.')
    .trim()
    .notEmpty()
    .withMessage('Todo title is required and cannot be empty.'),
  body('description')
    .isString()
    .withMessage('Todo Desciption must be of type string.'),
]);

export { createTodoValidator, todoByIdValidator, updateTodoValidator };
