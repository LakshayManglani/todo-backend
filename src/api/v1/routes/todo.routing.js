"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_validator_1 = require("../validators/todo.validator");
const todo_controller_1 = require("../controllers/todo.controller");
function todoRouter() {
    const router = (0, express_1.Router)();
    router
        .route('/')
        .post(todo_validator_1.createTodoValidator, todo_controller_1.createTodo)
        .get(todo_controller_1.getAllTodos)
        .delete(todo_controller_1.deleteAllTodos);
    router
        .route('/:todoId')
        .get(todo_validator_1.todoByIdValidator, todo_controller_1.getTodoById)
        .patch(todo_validator_1.updateTodoValidator, todo_controller_1.updateTodoById)
        .delete(todo_validator_1.todoByIdValidator, todo_controller_1.deleteTodoById);
    router
        .route('/toogle/status/:todoId')
        .patch(todo_validator_1.todoByIdValidator, todo_controller_1.toggleTodoDoneStatus);
    return router;
}
exports.default = todoRouter;
