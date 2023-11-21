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
exports.getByEmail = exports.updateAvatarById = exports.updatePasswordById = exports.generateAccessToken = exports.isPasswordCorrect = exports.getByUserId = exports.getByUsername = exports.register = void 0;
const db_1 = require("../db");
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User = db_1.sequelize.define('User', {
    givenName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    familyName: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: null,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: '/dummy_profile_image.jpeg',
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false,
    },
    loginType: {
        type: sequelize_1.DataTypes.ENUM('local', 'google'),
        defaultValue: 'local',
        allowNull: false,
    },
});
function register(givenName, familyName = '', email, userName, password, avatar = '/dummy_profile_image.jpeg', role = 'user', loginType) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = bcryptjs_1.default.genSaltSync(Number(process.env.SALT_ROUNDS));
            const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
            const user = yield User.create({
                givenName,
                familyName,
                email,
                userName,
                password: hashedPassword,
                avatar,
                role,
                loginType,
            });
            return yield user.toJSON();
        }
        catch (error) {
            console.error('Failed to register user', error);
            throw error;
        }
    });
}
exports.register = register;
function getByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ where: { id: userId } });
            if (!user) {
                return null;
            }
            const dataToJson = yield user.toJSON();
            return dataToJson;
        }
        catch (error) {
            console.error('Failed to get User', error);
            throw error;
        }
    });
}
exports.getByUserId = getByUserId;
function getByUsername(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ where: { userName } });
            if (!user) {
                return null;
            }
            const dataToJson = yield user.toJSON();
            return dataToJson;
        }
        catch (error) {
            console.error('Failed to get User', error);
            throw error;
        }
    });
}
exports.getByUsername = getByUsername;
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ where: { email } });
            if (!user) {
                return null;
            }
            const dataToJson = yield user.toJSON();
            return dataToJson;
        }
        catch (error) {
            console.error('Failed to get User', error);
            throw error;
        }
    });
}
exports.getByEmail = getByEmail;
function isPasswordCorrect(userName, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ where: { userName } });
            if (!user) {
                return false;
            }
            const hashedPassword = yield user.toJSON().password;
            return bcryptjs_1.default.compareSync(password, hashedPassword);
        }
        catch (error) {
            console.error('Failed to check password', error);
            throw error;
        }
    });
}
exports.isPasswordCorrect = isPasswordCorrect;
function generateAccessToken(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id, email, userName, password } = user;
            return jsonwebtoken_1.default.sign({ id, email, userName, password }, String(process.env.ACCESS_TOKEN_SECRET), {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            });
        }
        catch (error) {
            console.error('Failed to generate access token', error);
            throw error;
        }
    });
}
exports.generateAccessToken = generateAccessToken;
function updatePasswordById(userId, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = bcryptjs_1.default.genSaltSync(Number(process.env.SALT_ROUNDS));
            const hashedPassword = bcryptjs_1.default.hashSync(newPassword, salt);
            const affectedRows = yield User.update({ password: hashedPassword }, { where: { id: userId } });
            return affectedRows[0];
        }
        catch (error) {
            console.error('Failed to update password', error);
            throw error;
        }
    });
}
exports.updatePasswordById = updatePasswordById;
function updateAvatarById(userId, avatarUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const affectedRows = yield User.update({ avatar: avatarUrl }, { where: { id: userId } });
            return affectedRows[0];
        }
        catch (error) {
            console.error('Failed to update avatar', error);
            throw error;
        }
    });
}
exports.updateAvatarById = updateAvatarById;
exports.default = User;
