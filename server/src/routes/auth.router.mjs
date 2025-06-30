import { Router } from "express";
import { accountVerifyValidation, loginValidation, passwordResetOtpValidation, 
  passwordResetValidation, registerValidation } from "../validations/auth.validation.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import {loginUserController,  logOutUserController,  registerUserController, resetPasswordController, sendResetOtpController, sendVerifyOtpController, verifyEmailController } from "../controllers/auth.controller.mjs";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";

const authRouter = Router();

authRouter.get('/me', authMiddleware, (req, res) => {
  res.json({ success: true, data: req.user });
});

authRouter.post(
  "/register",
  registerValidation,
  handleValidationErrors("Register validation failed"),
  registerUserController
);

authRouter.post(
  "/login",
  loginValidation,
  handleValidationErrors("Login validation failed"),
  loginUserController
);

authRouter.post(
  "/send-verify-otp",
  authMiddleware,
  sendVerifyOtpController
);

authRouter.post(
  "/verify-account",
  authMiddleware,
  accountVerifyValidation,
  handleValidationErrors("Account verification failed", 401),
  verifyEmailController
);

// authRouter.get(
//   "/is-authenticated",
//   authMiddleware,
  
// );

authRouter.post(
  "/send-password-reset-otp",
  passwordResetOtpValidation,
  handleValidationErrors("Reset OTP validation failed"),
  sendResetOtpController
);

authRouter.post(
  "/password-reset",
  passwordResetValidation,
  handleValidationErrors("Password reset validation failed"),
  resetPasswordController
);
authRouter.post(
  "/logout",
  logOutUserController
)
export default authRouter;