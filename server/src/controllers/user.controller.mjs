import { getMyProfileService } from "../services/user.service.mjs";
import { successResponse } from "../utils/apiResponse.mjs";

export const getMyProfile = async (req, res, next) => {
    try {
        const result = await getMyProfileService(req.body.id);
        res.status(200).json(successResponse("My profile", result));
    } catch (error) {
        next(error);
    }
};