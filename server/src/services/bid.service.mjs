import Bid from "../models/auction.model.mjs";
import { saveBidRepository } from "../repositories/bid.repository.mjs";
import { errorResponse, successResponse } from "../utils/apiResponse.mjs";

export const getBidService = async () => {

    const bids = await getPlayerRepository();

    return successResponse("Bid fetched successfully");
};

export const saveBidService = async (bid) => {
    
  const bidData = {
    player_id: bid.playerId,
    team_id: bid.teamId || '685c2444bb6498e87bdec76a',
    bid_price: bid.bidValue,
    bid_date: new Date()
  };

  const currentMax = await checkBidValue(bidData.player_id);

  if (bidData.bid_price <= currentMax) {
    return errorResponse(`Bid value must be greater than ${currentMax}`);
  }

  const savedBid = await saveBidRepository(bidData);
  return successResponse("Bid saved successfully", savedBid);
}

export const checkBidValue = async (playerId) => {

  const maxBid = await Bid.find({ player_id: playerId })
    .sort({ bid_price: -1 })
    .limit(1);

    return maxBid[0]?.bid_price || 0;
};

