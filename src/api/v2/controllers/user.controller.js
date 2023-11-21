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
exports.updateUserAvatar = exports.registerUser = exports.logoutUser = exports.loginUser = exports.handleSocialLogin = exports.changeCurrentPassword = void 0;
const expressHandler_1 = __importDefault(require("../util/expressHandler"));
const apiError_1 = __importDefault(require("../util/apiError"));
const apiResponse_1 = __importDefault(require("../util/apiResponse"));
const user_model_1 = require("../models/user.model");
const changeCurrentPassword = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decodedUserName, oldPassword, newPassword, decodedUserId } = req.body;
        const user = yield (0, user_model_1.getByUsername)(decodedUserName);
        if (!user) {
            res
                .status(404)
                .json(new apiResponse_1.default(404, null, `User with username ${decodedUserName} not found.`, false));
            return;
        }
        if (user.loginType != 'local') {
            res
                .status(400)
                .json(new apiResponse_1.default(400, null, `Invalid login type.`, false));
            return;
        }
        const isValidPassword = yield (0, user_model_1.isPasswordCorrect)(decodedUserName, oldPassword);
        if (!isValidPassword) {
            res
                .status(400)
                .json(new apiResponse_1.default(400, null, `Invalid old Password.`, false));
            return;
        }
        yield (0, user_model_1.updatePasswordById)(Number(decodedUserId), newPassword);
        res
            .status(200)
            .clearCookie('accessToken')
            .json(new apiResponse_1.default(200, null, 'Password changed successfully', true));
    }
    catch (error) {
        console.error('Failed to change Password:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.changeCurrentPassword = changeCurrentPassword;
const handleSocialLogin = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, displayName, emails, photos, provider } = req.user;
        const userName = displayName.toLowerCase().replace(' ', '');
        const user = yield (0, user_model_1.getByUsername)(userName);
        if (user) {
            const userDto = {
                id: user.id,
                givenName: user.givenName,
                familyName: user.familyName,
                email: user.email,
                userName: user.userName,
                avatar: user.avatar,
                role: user.role,
            };
            const accessToken = yield (0, user_model_1.generateAccessToken)(user);
            res
                .status(200)
                .cookie('accessToken', accessToken)
                .json(new apiResponse_1.default(200, userDto, 'User logged in successfully', true));
            return;
        }
        const registerUser = yield (0, user_model_1.register)(name.givenName, name.familyName, emails[0].value, userName, '', photos[0].value, 'user', provider);
        const userDto = {
            id: registerUser.id,
            givenName: registerUser.givenName,
            familyName: registerUser.familyName,
            email: registerUser.email,
            userName: registerUser.userName,
            avatar: registerUser.avatar,
            role: registerUser.role,
        };
        const accessToken = yield (0, user_model_1.generateAccessToken)(registerUser);
        res
            .status(200)
            .cookie('accessToken', accessToken)
            .json(new apiResponse_1.default(200, userDto, 'User logged in successfully', true));
    }
    catch (error) {
        console.error('Failed to login user:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.handleSocialLogin = handleSocialLogin;
const loginUser = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const user = yield (0, user_model_1.getByUsername)(userName);
        if (!user) {
            res
                .status(409)
                .json(new apiResponse_1.default(409, null, `User with username ${userName} not found.`, false));
            return;
        }
        const isPasswordValid = yield (0, user_model_1.isPasswordCorrect)(userName, password);
        if (!isPasswordValid) {
            res
                .status(401)
                .json(new apiResponse_1.default(401, null, `User password does not match.`, false));
            return;
        }
        const userDto = {
            id: user.id,
            givenName: user.givenName,
            familyName: user.familyName,
            email: user.email,
            userName: user.userName,
            avatar: user.avatar,
            role: user.role,
        };
        const accessToken = yield (0, user_model_1.generateAccessToken)(user);
        res
            .status(200)
            .cookie('accessToken', accessToken)
            .json(new apiResponse_1.default(200, userDto, 'User logged in successfully', true));
    }
    catch (error) {
        console.error('Failed to login user:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.loginUser = loginUser;
const logoutUser = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decodedUserName } = req.body;
        const user = yield (0, user_model_1.getByUsername)(decodedUserName);
        if (!user) {
            res
                .status(404)
                .json(new apiResponse_1.default(404, null, `User with username ${decodedUserName} not found.`, false));
            return;
        }
        const userDto = {
            id: user.id,
            givenName: user.givenName,
            familyName: user.familyName,
            email: user.email,
            userName: user.userName,
            avatar: user.avatar,
            role: user.role,
        };
        res
            .status(200)
            .clearCookie('accessToken')
            .json(new apiResponse_1.default(200, userDto, 'User logeed out successfully', true));
    }
    catch (error) {
        console.error('Failed to logout user:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.logoutUser = logoutUser;
const registerUser = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { givenName, familyName, email, userName, password, avatar, role } = req.body;
        let userExists = yield (0, user_model_1.getByUsername)(userName);
        if (userExists) {
            res
                .status(409)
                .json(new apiResponse_1.default(409, null, `User with username ${userName} already exists.`, false));
            return;
        }
        userExists = yield (0, user_model_1.getByEmail)(email);
        if (userExists) {
            res
                .status(409)
                .json(new apiResponse_1.default(409, null, `User with email ${email} already exists.`, false));
            return;
        }
        const user = yield (0, user_model_1.register)(givenName, familyName, email, userName, password, avatar, role, 'local');
        const userDto = {
            id: user.id,
            givenName: user.givenName,
            familyName: user.familyName,
            email: user.email,
            userName: user.userName,
            avatar: user.avatar,
            role: user.role,
        };
        res
            .status(201)
            .json(new apiResponse_1.default(201, userDto, 'User registered successfully', true));
    }
    catch (error) {
        console.error('Failed to register user:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.registerUser = registerUser;
const updateUserAvatar = (0, expressHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { decodedUserId, avatarUrl } = req.body;
        const user = yield (0, user_model_1.getByUserId)(decodedUserId);
        if (!user) {
            res
                .status(404)
                .json(new apiResponse_1.default(404, null, `User not found.`, false));
            return;
        }
        yield (0, user_model_1.updateAvatarById)(decodedUserId, avatarUrl);
        res
            .status(200)
            .json(new apiResponse_1.default(200, { avatarUrl }, 'Avatar changed successfully', true));
    }
    catch (error) {
        console.error('Failed to change avatar:', error);
        const { message } = error;
        res.status(500).json(new apiError_1.default(500, error, false, message));
    }
}));
exports.updateUserAvatar = updateUserAvatar;
