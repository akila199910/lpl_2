import { loginUser, registerUser, sendUserVerifyOtp, verifyEmail } from "../services/auth.service.mjs";
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
            sameSite: "strict",
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

export const logout = (req, res, next) => {
    try {
      res.clearCookie("token");
      res.status(200).json(successResponse("User logout successfully"));
    } catch (error) {
      next(error);
    }
  };

export const sendVerifyOtp = async(req, res, next) => {
    try {
      const result = await sendUserVerifyOtp(req.body);
      res.status(200).json(successResponse("OTP sent successfully",result));
    } catch (error) {
      next(error);
    }
  };

export const verifyAccount = async(req, res, next) => {
  try {
    const result = await verifyEmail(req.body);
    res.status(200).json(successResponse("Account verify successfully",result));
  } catch (error) {
    next(error);
  }
}
  