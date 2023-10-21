import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

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
  const todo = await Todo.create({ title, description });
  const jsonData = await todo.toJSON();
  return jsonData;
}
async function getAll(): Promise<object> {
  const todo = await Todo.findAll();
  return todo;
}

export { create, getAll };
