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
exports.updateById = exports.toggleIsCompleteById = exports.deleteById = exports.deleteAll = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../db");
const sequelize_1 = require("sequelize");
const asyncHandler_1 = require("../util/asyncHandler");
const user_model_1 = __importDefault(require("./user.model"));
const Todo = db_1.sequelize.define('Todo', {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '',
    },
    isComplete: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
user_model_1.default.hasOne(Todo, { foreignKey: 'userId' });
function create(title, description, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo.create({ title, description, userId });
            const jsonData = yield todo.toJSON();
            return jsonData;
        }), 'Failed to create todo:');
    });
}
exports.create = create;
function getAll(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todos = yield Todo.findAll({ where: { userId } });
            return todos;
        }), 'Failed to getAll todos:');
    });
}
exports.getAll = getAll;
function getById(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo.findOne({ where: { userId, id } });
            return todo;
        }), 'Failed to getById:');
    });
}
exports.getById = getById;
function deleteAll(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todoCount = yield Todo.destroy({ where: { userId } });
            return todoCount;
        }), 'Failed to deleteAll todos:');
    });
}
exports.deleteAll = deleteAll;
function deleteById(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield Todo.destroy({ where: { userId, id } });
            return deletedRows;
        }), 'Failed to deleteById: ');
    });
}
exports.deleteById = deleteById;
function toggleIsCompleteById(userId, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo.findOne({ where: { userId, id } });
            if (!todo) {
                return null;
            }
            const { isComplete } = todo.dataValues;
            yield Todo.update({ isComplete: !isComplete }, { where: { userId, id } });
            return !isComplete;
        }), 'Failed to toggleIsCompleteById: ');
    });
}
exports.toggleIsCompleteById = toggleIsCompleteById;
function updateById(userId, id, newTitle, newDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            // Perform the update operation
            const affectedRows = yield Todo.update({ title: newTitle, description: newDescription }, { where: { userId, id } });
            return affectedRows[0];
        }), 'Failed to updateById: ');
    });
}
exports.updateById = updateById;
exports.default = Todo;
