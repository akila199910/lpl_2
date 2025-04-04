import { loginUser, registerUser } from "../services/auth.service.mjs";
import { successResponse } from "../utils/apiResponse.mjs";
import { generateToken } from "../utils/generateToken.mjs";

export const login = async(req,res,next) => {

    try {
        const { user } = await loginUser(req.body);
console.log(user)
        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
          });

        res.status(200).json(successResponse("User login successfully", user))
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
  