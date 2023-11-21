"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordUserValidator = exports.updateAvatarUserValidator = exports.loginUserValidator = exports.registerUserValidator = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = __importDefault(require("./validate"));
const givenName = () => (0, express_validator_1.body)('givenName')
    .isString()
    .withMessage('givenName must be defined of type string')
    .notEmpty()
    .withMessage('givenName cannot be empty');
const avatarUrl = () => (0, express_validator_1.body)('avatarUrl')
    .isString()
    .withMessage('avatarUrl must be defined of type string')
    .isURL()
    .withMessage('avatarUrl must be a valid url')
    .notEmpty()
    .withMessage('avatarUrl cannot be empty');
const familyName = () => (0, express_validator_1.body)('familyName')
    .optional()
    .isString()
    .withMessage('familyName must be defined of type string');
const email = () => (0, express_validator_1.body)('email')
    .isString()
    .withMessage('email must be defined of type string')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('email must be a valid email');
const userName = () => (0, express_validator_1.body)('userName')
    .isString()
    .withMessage('userName must be defined of type string')
    .notEmpty()
    .withMessage('userName cannot be empty')
    .matches(/^\S*$/)
    .withMessage('userName should not contain spaces')
    .isLowercase()
    .withMessage('userName must be in lowercase')
    .matches(/^[a-z0-9]*$/)
    .withMessage('userName should only contain alphanumeric characters')
    .isLength({ min: 4 })
    .withMessage('userName must be at least 4 characters long');
const password = (field) => (0, express_validator_1.body)(field)
    .isString()
    .withMessage(`${field} must be defined of type string`)
    .matches(/^\S*$/)
    .withMessage(`${field} should not contain spaces`)
    .matches(/^(?=.*[A-Z])/)
    .withMessage(`${field} must contains at least one uppercase character`)
    .matches(/^(?=.*[a-z])/)
    .withMessage(`${field} must contains at least one lowercase character`)
    .matches(/(?=.[@$!%?&])/)
    .withMessage(`${field} must contains at least one special character`)
    .isLength({ min: 8 })
    .withMessage(`${field} must be at least 8 characters long`);
const registerUserValidator = (0, validate_1.default)([
    givenName(),
    familyName(),
    email(),
    userName(),
    password('password'),
]);
exports.registerUserValidator = registerUserValidator;
const loginUserValidator = (0, validate_1.default)([userName(), password('password')]);
exports.loginUserValidator = loginUserValidator;
const updateAvatarUserValidator = (0, validate_1.default)([avatarUrl()]);
exports.updateAvatarUserValidator = updateAvatarUserValidator;
const changePasswordUserValidator = (0, validate_1.default)([
    password('oldPassword'),
    password('newPassword'),
]);
exports.changePasswordUserValidator = changePasswordUserValidator;
