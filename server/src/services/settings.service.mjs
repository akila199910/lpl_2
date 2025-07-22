import { getSettingRepository, updateSettingRepository } from "../repositories/settings.repository.mjs";
import { successResponse } from "../utils/apiResponse.mjs";

export const getSettingService = async () => {

    const setting = await getSettingRepository();
    return successResponse("Setting fetched successfully", setting);
};

export const updateSettingService = async (setting) => {
    const updatedSetting = await updateSettingRepository(setting);
    return successResponse("Setting updated successfully", updatedSetting);
};