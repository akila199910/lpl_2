import Bid from "../models/auction.model.mjs";
import { errorResponse } from "../utils/apiResponse.mjs";

export const getBidRepository = async () => {
  return await Bid.find();
};

export const saveBidRepository = async (bidData) => {
  
  const bid = new Bid(bidData);
  const saved = await bid.save();
  return saved;
};
