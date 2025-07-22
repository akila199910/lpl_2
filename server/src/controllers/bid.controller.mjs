import { saveBidService } from "../services/bid.service.mjs";
import { errorResponse } from "../utils/apiResponse.mjs";

export const getBidController = async (req, res) => {
  const result = await saveBidService(req.body);
  return res.status(result.success ? 200 : 400).json(result);
};

export const saveBidController = async (req, res) => {
  const result = await saveBidService(req.body);
  console.log(result) 
  return res.status(result.success ? 200 : 400).json(result);
};
