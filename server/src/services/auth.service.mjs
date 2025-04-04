import bcrypt from "bcryptjs";
import User from "../models/user.model.mjs";
import UserProfile from "../models/userProfile.model.mjs";
import { ErrorResponse } from "../utils/ErrorResponse.mjs";
import { generateToken } from "../utils/generateToken.mjs";

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

    const token = generateToken(user);
    
    return { user: { id: user._id, name: user.name, email: user.email }, token };
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