import { Router } from "express";
import { accountVerifyValidation, loginValidation, passwordResetOtpValidation, 
  passwordResetValidation, registerValidation } from "../validations/auth.validation.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { isUserAuthenticated, login, passwordReset, register, sendPasswordResetOtp, sendVerifyOtp, verifyAccount } from "../controllers/auth.controller.mjs";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";

const authRouter = Router();

authRouter.post(
  "/register",
  registerValidation,
  handleValidationErrors("Register validation failed"),
  register
);

authRouter.post(
  "/login",
  loginValidation,
  handleValidationErrors("Login validation failed"),
  login
);

authRouter.post(
  "/send-verify-otp",
  authMiddleware,
  sendVerifyOtp
);

authRouter.post(
  "/verify-account",
  authMiddleware,
  accountVerifyValidation,
  handleValidationErrors("Account verification failed", 401),
  verifyAccount
);

authRouter.get(
  "/is-authenticated",
  authMiddleware,
  isUserAuthenticated
);

authRouter.post(
  "/send-password-reset-otp",
  passwordResetOtpValidation,
  handleValidationErrors("Reset OTP validation failed"),
  sendPasswordResetOtp
);

authRouter.post(
  "/password-reset",
  passwordResetValidation,
  handleValidationErrors("Password reset validation failed"),
  passwordReset
);

export default authRouter;