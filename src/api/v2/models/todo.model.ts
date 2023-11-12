import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import { asyncHandller } from '../util/asyncHandler';
import User from './user.model';

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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasOne(Todo, { foreignKey: 'userId' });

async function create(
  title: string,
  description: string,
  userId: number
): Promise<object> {
  return asyncHandller(async () => {
    const todo = await Todo.create({ title, description, userId });
    const jsonData = await todo.toJSON();
    return jsonData;
  }, 'Failed to create todo:');
}

async function getAll(userId: number) {
  return asyncHandller(async () => {
    const todos = await Todo.findAll({ where: { userId } });
    return todos;
  }, 'Failed to getAll todos:');
}

async function getById(userId: number, id: number): Promise<object | null> {
  return asyncHandller(async () => {
    const todo = await Todo.findOne({ where: { userId, id } });

    return todo;
  }, 'Failed to getById:');
}

async function deleteAll(userId: number): Promise<number> {
  return asyncHandller(async () => {
    const todoCount = await Todo.destroy({ where: { userId } });
    return todoCount;
  }, 'Failed to deleteAll todos:');
}

async function deleteById(userId: number, id: number): Promise<number> {
  return asyncHandller(async () => {
    const deletedRows = await Todo.destroy({ where: { userId, id } });
    return deletedRows;
  }, 'Failed to deleteById: ');
}

async function toggleIsCompleteById(
  userId: number,
  id: number
): Promise<boolean | null> {
  return asyncHandller(async () => {
    const todo = await Todo.findOne({ where: { userId, id } });
    if (!todo) {
      return null;
    }

    const { isComplete } = todo.dataValues;

    await Todo.update({ isComplete: !isComplete }, { where: { userId, id } });
    return !isComplete;
  }, 'Failed to toggleIsCompleteById: ');
}

async function updateById(
  userId: number,
  id: number,
  newTitle: string,
  newDescription: string
): Promise<number> {
  return asyncHandller(async () => {
    // Perform the update operation
    const affectedRows = await Todo.update(
      { title: newTitle, description: newDescription },
      { where: { userId, id } }
    );

    return affectedRows[0];
  }, 'Failed to updateById: ');
}

export {
  create,
  getAll,
  getById,
  deleteAll,
  deleteById,
  toggleIsCompleteById,
  updateById,
};
export default Todo;
