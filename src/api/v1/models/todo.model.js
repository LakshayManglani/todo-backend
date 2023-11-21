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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateById = exports.toggleIsCompleteById = exports.deleteById = exports.deleteAll = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../db");
const sequelize_1 = require("sequelize");
const asyncHandler_1 = require("../util/asyncHandler");
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
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
});
function create(title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo.create({ title, description });
            const jsonData = yield todo.toJSON();
            return jsonData;
        }), 'Failed to create todo:');
    });
}
exports.create = create;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todos = yield Todo.findAll();
            return todos;
        }), 'Failed to getAll todos:');
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo.findByPk(id);
            return todo;
        }), 'Failed to getById:');
    });
}
exports.getById = getById;
function deleteAll() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todoCount = yield Todo.count();
            if (todoCount > 0) {
                yield Todo.truncate();
            }
            return todoCount;
        }), 'Failed to deleteAll todos:');
    });
}
exports.deleteAll = deleteAll;
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const deletedRows = yield Todo.destroy({ where: { id } });
            return deletedRows;
        }), 'Failed to deleteById: ');
    });
}
exports.deleteById = deleteById;
function toggleIsCompleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            const todo = yield Todo.findByPk(id);
            if (!todo) {
                return null;
            }
            const { isComplete } = todo.dataValues;
            yield Todo.update({ isComplete: !isComplete }, { where: { id } });
            return !isComplete;
        }), 'Failed to toggleIsCompleteById: ');
    });
}
exports.toggleIsCompleteById = toggleIsCompleteById;
function updateById(id, upTitle, upDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, asyncHandler_1.asyncHandller)(() => __awaiter(this, void 0, void 0, function* () {
            // Perform the update operation
            const affectedRows = yield Todo.update({ title: upTitle, description: upDescription }, { where: { id } });
            return affectedRows[0];
        }), 'Failed to updateById: ');
    });
}
exports.updateById = updateById;
