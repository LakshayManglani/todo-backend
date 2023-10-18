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
exports.getAllTodos = void 0;
const todo_model_1 = require("../models/todo.model");
const expressHandler_1 = __importDefault(require("../util/expressHandler"));
const getAllTodos = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, todo_model_1.getDatabases)();
    res.status(200).json(data);
}));
exports.getAllTodos = getAllTodos;
