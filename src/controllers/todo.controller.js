"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTodos = void 0;
// TODO: Create a util function which has types for req and res so that we can use it without giving type evertime.
function getAllTodos(req, res) {
    res.status(200).json({ message: 'From todo controller.' });
}
exports.getAllTodos = getAllTodos;
