import bcrypt from "bcryptjs";
import User from "../models/user.model.mjs";
import { ErrorResponse } from "../utils/ErrorResponse.mjs";
import { saveOtp, saveRestOtp, saveUserWithProfile, verifyUserAccount } from "../repositories/auth.repository.mjs";
import transport from "../configs/nodemailer.mjs";

export const loginUser = async(loginUser) => {
    const errors = {};

    const user = await User.findOne({ email:loginUser.email });
    if(!user) errors.email = "Email is not found our system";

    if(user){
        const isMatch = await bcrypt.compare(loginUser.password, user.password);
        if(!isMatch) errors.password = "Password is incorrect";
    }
    
    if (Object.keys(errors).length > 0) {
        throw new ErrorResponse("User login failed", 401, errors);
    }
    
    return { user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role} };
}
export const registerUser = async (registerUser) => {

    const errors = {};

    const isUserExit = await User.findOne({ email: registerUser.email });
    if (isUserExit) errors.email = "Email already exists";

    const isContactExit = await User.findOne({ contactNumber: registerUser.contactNumber });
    if (isContactExit) errors.contactNumber = "Contact number already exists";

    if (Object.keys(errors).length > 0) {
        throw new ErrorResponse("User register failed", 400, errors);
    }

    const hashedPassword = await bcrypt.hash(registerUser.password, 10);

    const registerUserData = {
        firstName: registerUser.firstName,
        lastName: registerUser.lastName,
        name: `${registerUser.firstName} ${registerUser.lastName}`,
        contactNumber: registerUser.contactNumber,
        status: registerUser.status,
        email: registerUser.email,
        password: hashedPassword,
        country: registerUser.country,
        role: registerUser.role,
      };
    
    const savedUser = await saveUserWithProfile(registerUserData, registerUser.profile);

    // send the welcome email to register user

    const mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: savedUser.email,
        subject: "Welcome to LPL",
        text: `Hello ${savedUser.name}, welcome to lanka premier league. We are excited to have you join us!`,
    };

    await transport.sendMail(mailOptions);

    return { user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } };
}

export const logoutUser = async () => {}

export const sendUserVerifyOtp = async (registerUser) => {
    const errors = {};
  
    const user = await User.findById(registerUser.id);
  
    if (!user) errors.user = "User not found";
    if (user?.isAccountVerified) errors.isAccountVerified = "Account is already verified";
  
    if (Object.keys(errors).length > 0) {
      throw new ErrorResponse("User account verification code send failed", 404, errors);
    }
  
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const otpExpireAt = Date.now() + 5 * 60 * 1000;
    const savedUser = await saveOtp(user._id.toString(), otp, otpExpireAt);
  
    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: user.email,
      subject: "Account Verification",
      text: `Hello ${user.name}, your account verification code is ${otp}`,
    };
  
    await transport.sendMail(mailOptions);
  
    return { id: savedUser };
};

export const verifyEmail = async(verifyData) => {
 console.log(verifyData)
    const errors = {};
    const user = await User.findById(verifyData.id);

    if(!user)
         errors.user = "User not found";

    if(user?.isAccountVerified)
         errors.isAccountVerified = "Account is already verified";

    if(user?.verifyOtp === ""||user?.verifyOtp !== verifyData.otp)
         errors.otp = "OTP is incorrect";

    if(user?.verifyOtpExpireAt < Date.now())
         errors.verifyOtpExpireAt = "OTP is expired";

    if (Object.keys(errors).length > 0) {
        throw new ErrorResponse("User account verification failed", 404, errors);
      }

      const userId = await verifyUserAccount(user._id.toString());

      return { id: userId };
}

export const sendUserPasswordResetOtp = async (passwordResetData) => {

    const errors = {};
    const user = await User.findOne({ email: passwordResetData.email });

    if(!user)
         errors.user = "User not found";

    if (Object.keys(errors).length > 0) {
        throw new ErrorResponse("User password reset code send failed", 404, errors);
      }

    const resetOtp = String(Math.floor(100000 + Math.random() * 900000));
    const resetOtpExpireAt = Date.now() + 5 * 60 * 1000;

    const savedUser = await saveRestOtp(user._id.toString(), resetOtp, resetOtpExpireAt);
  
    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: user.email,
      subject: "Password Reset",
      text: `Hello ${user.name}, your password reset code is ${resetOtp}`,
    };
  
    await transport.sendMail(mailOptions);
  
    return { id: savedUser };
}