"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const expressErrorHandler_1 = __importDefault(require("./util/expressErrorHandler"));
const apiError_1 = __importDefault(require("./util/apiError"));
const todo_routing_1 = __importDefault(require("./routes/todo.routing"));
const app = (0, express_1.default)();
function startApp(app) {
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    // Parse the request body data into json format
    app.use(express_1.default.json());
    // Then check for JSON syntax error
    app.use((0, expressErrorHandler_1.default)((err, req, res, next) => {
        if (err) {
            const { name, message } = err;
            res
                .status(400)
                .json(new apiError_1.default(400, { name, message }, false, 'Invalid JSON syntax'));
            return;
        }
    }));
    // api of todo
    app.use('/api/v1/todos', (0, todo_routing_1.default)());
}
exports.startApp = startApp;
exports.default = app;
