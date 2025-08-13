import User from "../models/user.model.mjs";
import { getMyProfileRepository } from "../repositories/user.repository.mjs";
import { ErrorResponse } from "../utils/ErrorResponse.mjs";

export const getMyProfileService = async (userId) => {
    const errors = {};

    const user = await  User.findById(userId);
    if(!user) errors.user = "User not found";

    if (Object.keys(errors).length > 0) {
        throw new ErrorResponse("User profile not found", 404, errors);
      }
    
    const userProfile = await getMyProfileRepository(userId);

    return userProfile;
    
};