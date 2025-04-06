import { Router } from "express";
import { validationResult } from "express-validator";
import { login, register, sendVerifyOtp, verifyAccount } from "../../src/controllers/auth.controller.mjs";
import { ErrorResponse } from "../../src/utils/ErrorResponse.mjs";
import { loginValidation, registerValidation, accountVerifyValidation } from "../../validations/auth/auth.validation.mjs";
import { authMiddleware } from "../../middlewares/authMiddleware.mjs";

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
const handleAccountVerifyErrors = (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorObject = {};
        errors.array().forEach(err => {
            if(!errorObject[err.path]){
                errorObject[err.path] = err.msg
            }
        })
        return next(new ErrorResponse("User account verify validation failed", 401, errorObject));
    }
    next()
}

authRouter.post("/register", registerValidation ,handleValidationErrors,register)
authRouter.post("/login", loginValidation,handleLoginValidationErrors, login)
authRouter.post("/send-verify-otp", authMiddleware, sendVerifyOtp);
authRouter.post("/verify-account", authMiddleware, accountVerifyValidation, handleAccountVerifyErrors, verifyAccount);

export default authRouter;