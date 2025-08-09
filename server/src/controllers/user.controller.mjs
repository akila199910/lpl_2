import { getUserByNameRepository } from "../repositories/user.repository.mjs";
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

export const getUserByNameController = async (req,res)=>{

    try {
        const name = req.params.name;
        const result = await getUserByNameRepository(name);

        return res.status(result.success ? 200 : 400).json(result);

    } catch (error) {
        
    }
}