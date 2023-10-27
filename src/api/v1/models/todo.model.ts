import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
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

async function getById(id: number): Promise<object> {
  return asyncHandller(async () => {
    const todo = await Todo.findByPk(id);
    return todo;
  }, 'Failed to getById todos:');
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

async function toggleIsCompleteById(id: number): Promise<boolean | null> {
  return asyncHandller(async () => {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return null;
    }

    const { isComplete } = todo.dataValues;

    const updateTodo = await Todo.update(
      { isComplete: !isComplete },
      { where: { id } }
    );
    return !isComplete;
  }, 'Failed to toggleIsCompleteById: ');
}

async function updateById(
  id: number,
  upTitle: string,
  upDescription: string
): Promise<any> {
  return asyncHandller(async () => {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return null;
    }

    // Perform the update operation
    await Todo.update(
      { title: upTitle, description: upDescription },
      { where: { id } }
    );

    // Fetch the updated todo after the update operation
    const updatedTodo = await Todo.findByPk(id);
    return updatedTodo;
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
