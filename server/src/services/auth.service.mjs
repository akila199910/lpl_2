import User from '../models/user.model.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { successResponse, errorResponse } from '../utils/apiResponse.mjs';
import { findUserByEmail, otpSaveAuthRepository, resetUserPasswordRepository, saveAuthRepository, verifyEmailAuthRepository } from '../repositories/auth.repository.mjs';
import transport from "../configs/nodemailer.mjs";

export const loginUserService = async (req,res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return errorResponse('User not found',{email: "email is not in the database"});

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return errorResponse('Password is incorrect',{password: "Password is incorrect"});

  const token = jwt.sign({ id: user._id, role : user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax', // or 'Strict' in production
      secure: false, // true if using https
      maxAge: 3600000, // 1 hour
    });

  return successResponse('User logged in successfully',{ user, token });
};

export const registerUserService = async (payload) => {

   const errors = {};
    if (await User.findOne({ email: payload.email })) errors.email = "Email already exists";
    if (await User.findOne({ contactNumber: payload.contactNumber })) errors.contactNumber = "Contact number already exists";
    if (Object.keys(errors).length > 0) return errorResponse("Validation failed", errors);

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const registeredUser = {
    firstName: payload.firstName,
    lastName: payload.lastName,
    name: `${payload.firstName} ${payload.lastName}`,
    contactNumber: payload.contactNumber,
    status: payload.status,
    email: payload.email,
    password: hashedPassword,
    country: payload.country,
    role: payload.role,
  };

  const { savedUser } = await saveAuthRepository(registeredUser);

  await transport.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: savedUser.email,
    subject: "Welcome to LPL",
    text: `Hello ${savedUser.name}, welcome to Lanka Premier League!`,
  });
  return successResponse('User registered successfully', savedUser);
};

export const logOutUserService = async (req,res) => {

  res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'Lax',
      secure: false,
      path: '/',
    });

  return successResponse('User logged out successfully');
};

export const sendUserVerifyOtpService = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) return errorResponse('User not found', { email: 'Email not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpData = {
      verifyOtp : otp,
      verifyOtpExpireAt : Date.now() + 10 * 60 * 1000,
      userId : user._id
    }

    const { saveOtpData } = await otpSaveAuthRepository(otpData);

  await sendMail({
    to: saveOtpData.email,
    subject: 'Your Verification OTP',
    text: `Your OTP is ${saveOtpData.verifyOtp}`,
  });

  return successResponse('OTP sent to email');
};

export const verifyEmailService = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) return errorResponse('User not found');

  if (user.verifyOtp !== otp || Date.now() > user.verifyOtpExpireAt) {
    return errorResponse('Invalid or expired OTP', { otp: 'Invalid or expired OTP' });
  }

  const emailVerifyData = {
      userId : user._id,
      isAccountVerified : true,
      verifyOtp : '',
      verifyOtpExpireAt : 0
    }

    const { savedUser } = await verifyEmailAuthRepository(emailVerifyData);

  return successResponse('Email verified successfully', savedUser);
};

export const sendUserPasswordResetOtpService = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) return errorResponse('User not found', { email: 'Email not found' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetOtp = otp;
  user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendMail({
    to: user.email,
    subject: 'Password Reset OTP',
    text: `Your password reset OTP is ${otp}`,
  });

  return successResponse('Password reset OTP sent');
};

export const resetUserPasswordService = async ({ email, otp, newPassword }) => {
  const user = await findUserByEmail(email);
  if (!user) return errorResponse('User not found');

  if (user.resetOtp !== otp || Date.now() > user.resetOtpExpireAt) {
    return errorResponse('Invalid or expired OTP', { otp: 'Invalid or expired OTP' });
  }

  password = await bcrypt.hash(newPassword, 10);

  const resetData = {
    password : password,
    resetOtp : '',
    resetOtpExpireAt : 0,
    userId : user._id
  }
  const { resetUser } = await resetUserPasswordRepository(resetData);

  return successResponse('Password reset successfully');
};
