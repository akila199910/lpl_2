import { getSettingService, updateSettingService } from "../services/settings.service.mjs";

export const getSettingController = async (req, res) => {
  const result = await getSettingService();
  return res.status(result.success ? 200 : 400).json(result);
};

export const updateSettingController = async (req, res) => {
  const result = await updateSettingService(req.body);
  return res.status(result.success ? 200 : 400).json(result);
};  