import { sequelize } from '../db';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
  givenName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  familyName: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: '../../public/dummy_profile_image.jpeg',
  },
});

async function register(
  givenName: string,
  familyName: string,
  email: string,
  userName: string,
  password: string
): Promise<object> {
  try {
    const user = await User.create({
      givenName,
      familyName,
      email,
      userName,
      password,
    });
    const jsonData = await user.toJSON();
    return jsonData;
  } catch (error) {
    console.error('Failed to register User', error);
    throw error;
  }
}

export { register };
