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
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: '../../public/',
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    allowNull: false,
  },
});

// For only development purpose
User.create({
  givenName: 'Lakshay',
  familyName: 'Manglani',
  email: 'lakshaymanglani2212@gmail.com',
  password: 'amio',
  role: 'admin',
});

export default User;
