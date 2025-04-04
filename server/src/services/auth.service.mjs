import bcrypt from "bcryptjs";
import User from "../models/user.model.mjs";
import { ErrorResponse } from "../utils/ErrorResponse.mjs";
import { saveUserWithProfile } from "../repositories/auth.repository.mjs";

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

    return { user: { id: savedUser._id, name: savedUser.name, email: savedUser.email } };
  
}