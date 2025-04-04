import { loginUser, registerUser } from "../services/auth.service.mjs";
import { successResponse } from "../utils/apiResponse.mjs";

export const login = async(req,res,next) => {

    try {
        const result = await loginUser(req.body);
        res.status(200).json(successResponse("User login successfully", result))
    } catch (error) {
        next(error);
    }
};
export const register = async (req, res, next) => {

    try {
      const result = await registerUser(req.body);
      res.status(201).json(successResponse("User registered successfully", result));
    } catch (error) {
      next(error);
    }
};
  