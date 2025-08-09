import User from "../models/user.model.mjs";
import { errorResponse, successResponse } from "../utils/apiResponse.mjs";

export const getMyProfileRepository = async (userId) => {

    return await User.findById(userId).select("-password");

};

export const getUserByNameRepository = async (name)=>{

    try {
        const users =  await User.find({
            name: { $regex: `^${name}`, $options: 'i' }
          });

           return successResponse("users fletch",users)

    } catch (error) {
        
    }
}