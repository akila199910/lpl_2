import { Router } from "express";
import { validationResult } from "express-validator";
import { login, register } from "../../src/controllers/auth.controller.mjs";
import { ErrorResponse } from "../../src/utils/ErrorResponse.mjs";
import { loginValidation, registerValidation } from "../../validations/auth/auth.validation.mjs";

const authRouter = Router();

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorObject = {};
        errors.array().forEach(err => {
            if (!errorObject[err.path]) {
                errorObject[err.path] = err.msg;
            }
          });
        return next(new ErrorResponse("User Register validation failed", 400, errorObject));
    }
    next();
};

const handleLoginValidationErrors = (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorObject = {};
        errors.array().forEach(err => {
            if(!errorObject[err.path]){
                errorObject[err.path] = err.msg
            }
        })
        return next(new ErrorResponse("User login validation failed", 400, errorObject));
    }
    next()
}

authRouter.post("/register", registerValidation ,handleValidationErrors,register)
authRouter.post("/login", loginValidation,handleLoginValidationErrors, login)
export default authRouter;