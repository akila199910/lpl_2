import bcrypt from "bcryptjs";
import User from "../models/user.model.mjs";
import UserProfile from "../models/userProfile.model.mjs";
import { ErrorResponse } from "../utils/ErrorResponse.mjs";
export const registerUser = async (registerUser) => {

    const errors = {};

    const isUserExit = await User.findOne({ email: registerUser.email });
    if (isUserExit) errors.email = "Email already exists";

    const isContactExit = await User.findOne({ contactNumber: registerUser.contactNumber });
    if (isContactExit) errors.contactNumber = "Contact number already exists";

    if (Object.keys(errors).length > 0) {
        throw new ErrorResponse("User register validation failed", 400, errors);
    }

    const hashedPassword = await bcrypt.hash(registerUser.password, 10);

    const user = new User();
        user.firstName = registerUser.firstName;
        user.lastName = registerUser.lastName;
        user.name = `${registerUser.firstName} ${registerUser.lastName}`;
        user.contactNumber = registerUser.contactNumber;
        user.status = registerUser.status;
        user.email = registerUser.email;
        user.password = hashedPassword;
        user.country = registerUser.country;
        user.role = registerUser.role;
    const savedUser = await user.save();

    if (!savedUser) throw new ErrorResponse('User registration failed');

    const userProfile = new UserProfile();
        userProfile.user = savedUser._id;
        userProfile.profileImageUrl = registerUser.profile || 'user.png';
    const savedUserProfile = await userProfile.save();

    if(!savedUserProfile) throw new ErrorResponse('User profile created failed');
  
    return { user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } };
  
}