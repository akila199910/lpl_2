import { validationResult } from "express-validator";
import { errorResponse } from "../utils/apiResponse.mjs";

export const handleValidationErrors = (m) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorObject = {};
      errors.array().forEach(err => {
        if (!errorObject[err.path]) {
          errorObject[err.path] = err.msg;
        }
      });
      return res.status(400).json(errorResponse(m,errorObject));
    }
    next();
  };
};
