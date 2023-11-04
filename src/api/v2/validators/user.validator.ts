import { body } from 'express-validator';
import validate from './validate';

const registerUserValidator = validate([
  body('givenName')
    .isString()
    .withMessage('givenName must be defined of type string')
    .notEmpty()
    .withMessage('givenName cannot be empty'),

  body('familyName')
    .optional()
    .isString()
    .withMessage('familyName must be defined of type string'),

  body('email')
    .isString()
    .withMessage('email must be defined of type string')
    .isEmail()
    .withMessage('email is invalid')
    .normalizeEmail(),

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
    .withMessage('userName must be at least 4 characters long'),

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
    .withMessage('password must be at least 8 characters long'),
]);

const loginUserValidator = validate([
  body('userName')
    .isString()
    .withMessage('userName must be defined of type string')
    .notEmpty()
    .withMessage('userName is required')
    .matches(/^\S*$/)
    .withMessage('userName should not contain spaces')
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage('userName should only contain alphanumeric characters'),

  body('password')
    .isString()
    .withMessage('password must be defined of type string')
    .matches(/^\S*$/)
    .withMessage('password should not contain spaces')
    .matches(/^\S*$/)
    .withMessage('password must contains at least one uppercase character')
    .matches(/^\S*$/)
    .withMessage('password must contains at least one lowercase character')
    .matches(/^\S*$/)
    .withMessage('password must contains at least one special character')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
]);

export { registerUserValidator, loginUserValidator };
