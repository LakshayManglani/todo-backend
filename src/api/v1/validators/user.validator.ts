import { body, param } from 'express-validator';
import validate from './validate';
// givenName,
//       familyName,
//       email,
//       userName,
//       password,
const registerUserValidator = validate([
  body('givenName')
    .isString()
    .withMessage('Title must be defined of type string')
    .notEmpty()
    .withMessage('Given name is required'),
  body('familyName')
    .optional()
    .isString()
    .withMessage('Title must be defined of type string'),
  body('email')
    .isString()
    .withMessage('Title must be defined of type string')
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail(),
  body('userName')
    .isString()
    .withMessage('Title must be defined of type string')
    .notEmpty()
    .withMessage('Username is required')
    .matches(/^\S*$/)
    .withMessage('Username should not contain spaces')
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage('Username should only contain alphanumeric characters'),
  body('password')
    .isString()
    .withMessage('Title must be defined of type string')
    .matches(/^\S*$/)
    .withMessage('Password should not contain spaces')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]);

export { registerUserValidator };
