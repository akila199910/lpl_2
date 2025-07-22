import  Setting  from "../models/rule.model.mjs";

export const getSettingRepository = async () => {
    return await Setting.findOne();
};

export const updateSettingRepository = async(setting) => {
    const updated = await Setting.findOneAndUpdate(
    {},                        
    setting,
    { new: true, upsert: true }
  );
  return updated;
}