"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTodos = exports.toggleTodoDoneStatus = exports.deleteTodoById = exports.updateTodoById = exports.getTodoById = exports.getAllTodos = exports.createTodo = void 0;
const todo_model_1 = require("../models/todo.model");
const apiError_1 = __importDefault(require("../util/apiError"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const expressHandler_1 = __importDefault(require("../util/expressHandler"));
const createTodo = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, decodedUserId } = req.body;
        const data = yield (0, todo_model_1.create)(title, description, decodedUserId);
        res
            .status(201)
            .json(new apiResponse_1.default(201, data, 'Todo created successfully', true));
    }
    catch (error) {
        console.error('Failed to createTodo:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.createTodo = createTodo;
const getAllTodos = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decodedUserId } = req.body;
        const data = yield (0, todo_model_1.getAll)(decodedUserId);
        res
            .status(200)
            .json(new apiResponse_1.default(200, data, 'Data get successfully', true));
    }
    catch (error) {
        console.error('Failed to getAllTodos:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.getAllTodos = getAllTodos;
const getTodoById = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        const { decodedUserId } = req.body;
        const data = yield (0, todo_model_1.getById)(Number(decodedUserId), Number(todoId));
        if (!data) {
            res
                .status(404)
                .json(new apiResponse_1.default(404, null, `Todo with ID ${todoId} not found.`, false));
            return;
        }
        res
            .status(200)
            .json(new apiResponse_1.default(200, data, 'Data get successfully', true));
    }
    catch (error) {
        console.error('Failed to getTodoById:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, null, false, message));
    }
}));
exports.getTodoById = getTodoById;
const updateTodoById = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        const { decodedUserId } = req.body;
        const { title, description } = req.body;
        const affectedRows = yield (0, todo_model_1.updateById)(Number(decodedUserId), Number(todoId), title, description);
        if (affectedRows === 0) {
            res
                .status(404)
                .json(new apiResponse_1.default(404, null, `Todo with ID ${todoId} not found.`, false));
            return;
        }
        res
            .status(200)
            .json(new apiResponse_1.default(200, { affectedRows }, 'Todo updated successfully', true));
    }
    catch (error) {
        console.error('Failed to updateTodoById:', error);
        res
            .status(500)
            .json(new apiError_1.default(500, null, false, 'Failed to update the todo.'));
    }
}));
exports.updateTodoById = updateTodoById;
const deleteTodoById = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        const { decodedUserId } = req.body;
        const data = yield (0, todo_model_1.deleteById)(Number(decodedUserId), Number(todoId));
        if (data === 0) {
            res
                .status(404)
                .json(new apiResponse_1.default(404, null, `Todo with ID ${todoId} not found.`, false));
            return;
        }
        res
            .status(200)
            .json(new apiResponse_1.default(204, { deletedRows: data }, 'Data deleted successfully', true));
    }
    catch (error) {
        console.error('Failed to deleteTodoById:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.deleteTodoById = deleteTodoById;
const deleteAllTodos = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decodedUserId } = req.body;
        const data = yield (0, todo_model_1.deleteAll)(decodedUserId);
        res
            .status(200)
            .json(new apiResponse_1.default(204, { deletedRows: data }, 'Data deleted successfully', true));
    }
    catch (error) {
        console.error('Failed to deleteTodoById:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.deleteAllTodos = deleteAllTodos;
const toggleTodoDoneStatus = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { todoId } = req.params;
        const { decodedUserId } = req.body;
        const isComplete = yield (0, todo_model_1.toggleIsCompleteById)(Number(decodedUserId), Number(todoId));
        if (isComplete === null) {
            res
                .status(404)
                .json(new apiResponse_1.default(404, null, `Todo with ID ${todoId} not found.`, false));
            return;
        }
        res
            .status(200)
            .json(new apiResponse_1.default(200, { isComplete }, 'isComplete toggle succesfully', true));
    }
    catch (error) {
        console.error('Failed to getTodoById:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.toggleTodoDoneStatus = toggleTodoDoneStatus;
