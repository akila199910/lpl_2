import { getBidService, saveBidService } from "../services/bid.service.mjs";

export const getBidController = async (req, res) => {
  const result = await getBidService(req.body);
  return res.status(result.success ? 200 : 400).json(result);
};

export const saveBidController = async (req, res) => {
  
  const result = await saveBidService(req.body);

  return res.status(result.success ? 200 : 400).json(result);
};

// export const updateBidController = async (req, res) => {
//   const result = await updateBidService(req.body);
//   return res.status(result.success ? 200 : 400).json(result);
// };
