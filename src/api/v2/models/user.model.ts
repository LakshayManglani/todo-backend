import { sequelize } from '../db';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
    allowNull: false,
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
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hashedPassword = bcrypt.hashSync(password, salt);

    await User.create({
      givenName,
      familyName,
      email,
      userName,
      password: hashedPassword,
    });

    return { givenName, familyName, email, userName };
  } catch (error) {
    console.error('Failed to register User', error);
    throw error;
  }
}

async function getByUsername(userName: string): Promise<object | null> {
  try {
    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return null;
    }

    const { givenName, familyName, email } = await user.toJSON();

    return { givenName, familyName, email, userName };
  } catch (error) {
    console.error('Failed to get User', error);
    throw error;
  }
}

async function isPasswordCorrect(
  userName: string,
  password: string
): Promise<boolean> {
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return false;
    }

    const hashedPassword = await user.toJSON().password;

    return bcrypt.compareSync(password, hashedPassword);
  } catch (error) {
    console.error('Failed to check password', error);
    throw error;
  }
}

async function generateAccessToken(user: object): Promise<string> {
  try {
    return jwt.sign(user, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.error('Failed to generate access token', error);
    throw error;
  }
}

export { register, getByUsername, isPasswordCorrect, generateAccessToken };
export default User;
