import { sequelize } from '../db';
import { BaseError, DataTypes } from 'sequelize';
import { asyncHandller } from '../util/asyncHandler';

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

async function create(title: string, description: string): Promise<object> {
  return asyncHandller(async () => {
    const todo = await Todo.create({ title, description });
    const jsonData = await todo.toJSON();
    return jsonData;
  }, 'Failed to create todo:');
}

async function getAll(): Promise<object[]> {
  return asyncHandller(async () => {
    const todos = await Todo.findAll();
    return todos;
  }, 'Failed to getAll todos:');
}

async function deleteAll(): Promise<number> {
  return asyncHandller(async () => {
    const todoCount = await Todo.count();
    if (todoCount > 0) {
      await Todo.truncate();
    }
    return todoCount;
  }, 'Failed to deleteAll todos:');
}

async function deleteById(id: number): Promise<number> {
  return asyncHandller(async () => {
    const deletedRows = await Todo.destroy({ where: { id } });
    return deletedRows;
  }, 'Failed to deleteById: ');
}

export { create, getAll, deleteAll, deleteById };
