"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTodos = void 0;
const expressHandler_1 = __importDefault(require("../util/expressHandler"));
const getAllTodos = (0, expressHandler_1.default)((req, res) => {
    res.status(200).json({ message: 'Get all todos.' });
});
exports.getAllTodos = getAllTodos;
