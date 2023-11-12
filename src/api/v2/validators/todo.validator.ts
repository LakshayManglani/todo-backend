import { body, param } from 'express-validator';
import validate from './validate';

const title = () =>
  body('title')
    .isString()
    .withMessage('Title must be defined of type string.')
    .trim()
    .notEmpty()
    .withMessage('Todo title is required and cannot be empty.');

const description = () =>
  body('description')
    .isString()
    .withMessage('Todo Desciption must be of type string.');

const decodedUserId = () =>
  body('decodedUserId')
    .notEmpty()
    .withMessage('User Id is required')
    .isInt()
    .withMessage('User Id must be type int.');

const todoId = () =>
  param('todoId').isInt().withMessage('Todo Id must be type int');

const createTodoValidator = validate([title(), description(), decodedUserId()]);

const todoByIdValidator = validate([todoId()]);

const updateTodoValidator = validate([todoId(), title(), description()]);

export { createTodoValidator, todoByIdValidator, updateTodoValidator };
