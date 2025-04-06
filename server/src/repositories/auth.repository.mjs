import User from "../models/user.model.mjs";
import UserProfile from "../models/userProfile.model.mjs";

export const saveUserWithProfile = async (userData, profileImage = "user.png") => {

  const user = new User(userData);
  const savedUser = await user.save();

  const userProfile = new UserProfile();
        userProfile.user = savedUser._id;
        userProfile.profileImageUrl = profileImage;
        await userProfile.save();       

  return savedUser;
};
export const saveOtp = async (userId, otp, otpExpireAt) => {

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpireAt,
    },
    { new: true } 
  );

  return updatedUser._id.toString();
};

export const verifyUserAccount = async(userId)=>{

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      isAccountVerified: true,
      verifyOtp: '',
      verifyOtpExpireAt: 0,
    },
    { new: true } 
  );

  return updatedUser._id.toString();
}