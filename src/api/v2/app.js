"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const expressErrorHandler_1 = __importDefault(require("./util/expressErrorHandler"));
const apiError_1 = __importDefault(require("./util/apiError"));
const user_routing_1 = __importDefault(require("./routes/user.routing"));
const todo_routing_1 = __importDefault(require("./routes/todo.routing"));
const app = (0, express_1.default)();
function startApp(app) {
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }));
    // Parse the cookie
    app.use((0, cookie_parser_1.default)());
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
    app.use((0, express_session_1.default)({
        secret: String(process.env.EXPRESS_SESSION_SECRET),
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    // api of user
    app.use('/api/v2/users', (0, user_routing_1.default)());
    // api of todo
    app.use('/api/v2/todos', (0, todo_routing_1.default)());
}
exports.startApp = startApp;
exports.default = app;
