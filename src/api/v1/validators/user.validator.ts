import { body, param } from 'express-validator';
import validate from './validate';
// givenName,
//       familyName,
//       email,
//       userName,
//       password,
const registerUserValidator = validate([
  body('givenName').isString().notEmpty().withMessage('Given name is required'),
  body('familyName')
    .optional()
    .isString()
    .withMessage('Family name is required'),
  body('email')
    .isString()
    .isEmail()
    .withMessage('Invalid email')
    .normalizeEmail(),
  body('userName')
    .isString()
    .notEmpty()
    .withMessage('Username is required')
    .matches(/^\S*$/)
    .withMessage('Username should not contain spaces')
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage('Username should only contain alphanumeric characters'),
  body('password')
    .matches(/^\S*$/)
    .withMessage('Password should not contain spaces')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]);

export { registerUserValidator };
