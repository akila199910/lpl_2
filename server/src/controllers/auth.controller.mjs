import {
  loginUserService,
  registerUserService,
  logOutUserService,
  sendUserVerifyOtpService,
  verifyEmailService,
  sendUserPasswordResetOtpService,
  resetUserPasswordService
} from '../services/auth.service.mjs';

export const loginUserController = async (req, res, next) => {
  try {
    const result = await loginUserService(req,res);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    next(err);
  }
};

export const registerUserController = async (req, res, next) => {
  try {
    const result = await registerUserService(req.body);
    return res.status(result.success ? 201 : 400).json(result);
  } catch (err) {
    next(err);
  }
};

export const logOutUserController = async (req, res, next) => {
  const result = await logOutUserService(req,res);
  return res.status(result.success ? 200 : 400).json(result);
};

export const sendVerifyOtpController = async (req, res, next) => {
  try {
    const result = await sendUserVerifyOtpService(req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    next(err);
  }
};

export const verifyEmailController = async (req, res, next) => {
  try {
    const result = await verifyEmailService(req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    next(err);
  }
};

export const sendResetOtpController = async (req, res, next) => {
  try {
    const result = await sendUserPasswordResetOtpService(req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    next(err);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const result = await resetUserPasswordService(req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    next(err);
  }
};
