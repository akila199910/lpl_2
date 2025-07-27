import Bid from "../models/bid.model.mjs";
import { getIO } from "../utils/socket.js";
import { getBidRepository, getPlayerBidRepository, saveBidRepository } from "../repositories/bid.repository.mjs";
import { errorResponse, successResponse } from "../utils/apiResponse.mjs";
import Team from "../models/team.model.mjs";

export const getBidService = async () => {

    const bids = await getBidRepository();

    return successResponse("Bid fetched successfully",bids);
};

export const getPlayerBidService = async (id) => {

  const auctionsData =  await getPlayerBidRepository(id);

  if (!auctionsData) {
    return errorResponse("Bid not found");
  }

  return successResponse("Bid fetched successfully",auctionsData);
};

export const saveBidService = async (bid) => {

  const teamOwnerId = bid.id;

  const team = await Team.findOne({ owner_id: teamOwnerId });

  const bidData = {
    player_id: bid.playerId,
    team_id: team._id,
    bid_value: bid.bidValue,
    bid_date: new Date(),
    auction_id: bid.auctionId
  };

  const currentMax = await checkBidValue(bidData.player_id);

  if (bidData.bid_value <= currentMax) {
    return errorResponse(`Bid value must be greater than ${currentMax}`);
  }

  const bidArray = await saveBidRepository(bidData);
  const io = getIO();
  io.emit("highestBidsUpdate", { bidArray });
  
  return successResponse("Bid saved successfully", { bidArray });
}

export const checkBidValue = async (playerId) => {

  const maxBid = await Bid.find({ player_id: playerId })
    .sort({ bid_value: -1 })
    .limit(1);

    return maxBid[0]?.bid_value || 0;
};

export const checkHeighestBid = async (playerId, auctionId) => {

  const maxBid = await Bid.find({ player_id: playerId, auction_id: auctionId })
    .sort({ bid_value: -1 })
    .limit(1);
    
    if(maxBid.length > 0){
      return { status : true, team_id: maxBid[0].team_id, player_id: maxBid[0].player_id };
    }else{
      return { status : false , player_id: playerId };
    }
}
// export const updateBidService = async (updateBid) => {
//   const result = await updateBidService(req.body);
//   return res.status(result.success ? 200 : 400).json(result);
// };
