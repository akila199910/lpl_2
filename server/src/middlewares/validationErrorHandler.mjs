import { validationResult } from "express-validator";
import { ErrorResponse } from "../utils/ErrorResponse.mjs";

export const handleValidationErrors = (message = "Validation failed", statusCode = 400) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject = {};
      errors.array().forEach(err => {
        if (!errorObject[err.path]) {
          errorObject[err.path] = err.msg;
        }
      });
      return next(new ErrorResponse(message, statusCode, errorObject));
    }
    next();
  };
};
