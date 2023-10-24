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
  try {
    const todo = await Todo.create({ title, description });
    const jsonData = await todo.toJSON();
    return jsonData;
  } catch (error) {
    console.error('Failed to create todo:', error);
    throw error;
  }
}

async function getAll(): Promise<object[]> {
  try {
    const todo = await Todo.findAll();
    return todo;
  } catch (error) {
    console.error('Failed to getAll todos:', error);
    throw error;
  }
}

async function deleteAll(): Promise<number> {
  try {
    const todo = await Todo.count();
    if (todo > 0) {
      await Todo.truncate();
      return todo;
    }
    return 0;
  } catch (error) {
    console.error('Failed to deleteAll todos', error);
    throw error;
  }
}

async function deleteById(id: number): Promise<number> {
  try {
    const todo = await Todo.destroy({ where: { id } });
    return todo;
  } catch (error) {
    console.error('Failed to deleteById: ', error);
    throw error;
  }
}

export { create, getAll, deleteAll, deleteById };
