"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoValidator = exports.todoByIdValidator = exports.createTodoValidator = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("./validate"));
const createTodoValidator = (0, validate_1.default)([
    (0, express_validator_1.body)('title')
        .isString()
        .withMessage('Title must be defined of type string.')
        .trim()
        .notEmpty()
        .withMessage('Todo title is required and cannot be empty.'),
    (0, express_validator_1.body)('description')
        .isString()
        .withMessage('Todo Desciption must be of type string.'),
]);
exports.createTodoValidator = createTodoValidator;
const todoByIdValidator = (0, validate_1.default)([
    (0, express_validator_1.param)('todoId').isInt().withMessage('Todo Id must be type int'),
]);
exports.todoByIdValidator = todoByIdValidator;
const updateTodoValidator = (0, validate_1.default)([
    (0, express_validator_1.param)('todoId').isInt().withMessage('Todo Id must be type int'),
    (0, express_validator_1.body)('title')
        .isString()
        .withMessage('Title must be defined of type string.')
        .trim()
        .notEmpty()
        .withMessage('Todo title is required and cannot be empty.'),
    (0, express_validator_1.body)('description')
        .isString()
        .withMessage('Todo Desciption must be of type string.'),
]);
exports.updateTodoValidator = updateTodoValidator;
