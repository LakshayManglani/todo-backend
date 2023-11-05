import { body } from 'express-validator';
import validate from './validate';

const givenName = () =>
  body('givenName')
    .isString()
    .withMessage('givenName must be defined of type string')
    .notEmpty()
    .withMessage('givenName cannot be empty');

const familyName = () =>
  body('familyName')
    .optional()
    .isString()
    .withMessage('familyName must be defined of type string');

const email = () =>
  body('email')
    .isString()
    .withMessage('email must be defined of type string')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('email must be a valid email');

const userName = () =>
  body('userName')
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

const password = () =>
  body('password')
    .isString()
    .withMessage('password must be defined of type string')
    .matches(/^\S*$/)
    .withMessage('password should not contain spaces')
    .matches(/^(?=.*[A-Z])/)
    .withMessage('password must contains at least one uppercase character')
    .matches(/^(?=.*[a-z])/)
    .withMessage('password must contains at least one lowercase character')
    .matches(/(?=.[@$!%?&])/)
    .withMessage('password must contains at least one special character')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long');

const registerUserValidator = validate([
  givenName(),
  familyName(),
  email(),
  userName(),
  password(),
]);

const loginUserValidator = validate([userName(), password()]);

export { registerUserValidator, loginUserValidator };
