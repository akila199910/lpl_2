import User from "../models/user.model.mjs";

export const getMyProfileRepository = async (userId) => {

    return await User.findById(userId).select("-password");

};