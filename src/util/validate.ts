import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations: ValidationChain[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // FIXME: It only runs one time and later validation doesn't get checked
    for (let validation of validations) {
      const result = await validation.run(req);

      // If the length of the 'errors' is greater than 0, then break.
      if (result.array.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

export default validate;
