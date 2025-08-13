import { getDashboardRepository } from "../repositories/dashboard.repository.mjs";

export const getDashboardController = async (req,res) => {
  
    const result = await getDashboardRepository();
  
    return res.status(result.success ? 200 : 400).json(result)
  }
  