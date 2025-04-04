import { validationResult } from "express-validator";
import { registerUser } from "../services/auth.service.mjs";
import { errorResponse, successResponse } from "../utils/apiResponse.mjs";
export const register = async(req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json( errorResponse(errors.array()[0].msg));
    }
    try {

        const result = await registerUser(req.body);
        res.status(201).json(successResponse("User registered successfully", result));
    } catch (error) {
        next(error);
    }
}