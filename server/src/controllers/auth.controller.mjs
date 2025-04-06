import { loginUser, registerUser, sendUserPasswordResetOtp, sendUserVerifyOtp, verifyEmail } from "../services/auth.service.mjs";
import { successResponse } from "../utils/apiResponse.mjs";
import { generateToken } from "../utils/generateToken.mjs";


// user log in function
export const login = async(req,res,next) => {

    try {
        const { user } = await loginUser(req.body);
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

// user register function
export const register = async (req, res, next) => {

    try {
      const result = await registerUser(req.body);
      res.status(201).json(successResponse("User registered successfully", result));
    } catch (error) {
      next(error);
    }
};

//user logout function
export const logout = (req, res, next) => {
    try {
      res.clearCookie("token");
      res.status(200).json(successResponse("User logout successfully"));
    } catch (error) {
      next(error);
    }
  };

  // send verify otp to user, to verify registered account
export const sendVerifyOtp = async(req, res, next) => {
    try {
      const result = await sendUserVerifyOtp(req.body);
      res.status(200).json(successResponse("OTP sent successfully",result));
    } catch (error) {
      next(error);
    }
  };


// verify user account using otp
export const verifyAccount = async(req, res, next) => {
  try {
    const result = await verifyEmail(req.body);
    res.status(200).json(successResponse("Account verify successfully",result));
  } catch (error) {
    next(error);
  }
}

// check user authentication 
export const isUserAuthenticated = (req, res, next) => {
    try {
      res.status(200).json(successResponse("User is authenticated", req.user));
    } catch (error) {
      next(error);
    }
  };
  
  // send password reset otp

export const sendPasswordResetOtp = async(req, res, next) => {
    try {
      const result = await sendUserPasswordResetOtp(req.body);
      res.status(200).json(successResponse("Password reset OTP sent successfully",result));
    } catch (error) {
      next(error);
    }
}