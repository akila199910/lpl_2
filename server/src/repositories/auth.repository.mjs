import User from '../models/user.model.mjs';
import userProfileModel from '../models/userProfile.model.mjs';
import Player from "../models/player.model.mjs";

export const findUserByEmail = (email) => User.findOne({ email });
export const saveUser = (user) => user.save();

export const saveAuthRepository = async (registeredUser) => {
  const user = new User(registeredUser);
  const savedUser = await user.save();

  const userProfile = new userProfileModel({
    user: savedUser._id,
    profileImageUrl: "user.png",
  });
  await userProfile.save();

  if(savedUser.role != "Guest") {
    const player = new Player({ user_id: savedUser._id });
    await player.save();
  }

  return {savedUser };
};

export const otpSaveAuthRepository = async (otpData) => {
  const updatedUser = await User.findByIdAndUpdate(
      otpData.userId,
      {
        verifyOtp : otpData.otp,
        verifyOtpExpireAt : otpData.verifyOtpExpireAt
      },
      { new: true }
    );

  return { updatedUser };
}

export const verifyEmailAuthRepository = async(emailVerifyData)=>{

  const updatedUser = await User.findByIdAndUpdate(
        emailVerifyData.userId,
        {
          isAccountVerified : emailVerifyData.isAccountVerified,
          verifyOtpExpireAt : emailVerifyData.verifyOtpExpireAt,
          verifyOtp : emailVerifyData.verifyOtp
        },
        { new: true }
      );

    return { updatedUser };
}

export const resetUserPasswordRepository = async(resetData)=>{

  const updatedUser = await User.findByIdAndUpdate(
          resetData.userId,
          {
            password : resetData.password,
            resetOtp : resetData.resetOtp,
            resetOtpExpireAt : resetData.resetOtpExpireAt
          },
          { new: true }
        );

      return { updatedUser };
}