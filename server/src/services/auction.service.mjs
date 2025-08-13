import { getIO } from "../utils/socket.js";
import Rule from "../models/rule.model.mjs";
import { getAuctionRepository, saveAuctionRepository, updateAuctionRepository } from "../repositories/auction.repository.mjs";

export const getAuctionService = async () => {
  try {
    const auction = await getAuctionRepository();

    if (!auction) {
      return {
        success: false,
        message: "No ongoing auction found.",
        isServerError: false // Not a server error, just no data
      };
    }

    return {
      success: true,
      message: "Auction fetched successfully.",
      data: auction
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch auction.",
      error: error.message,
      isServerError: true
    };
  }
};
export const saveAuctionService = async (auction) => {
  try {
    const rule = await Rule.findOne({});

    if (!rule) {
      return {
        success: false,
        message: "Auction rule not found.",
        isServerError: false
      };
    }
    auction.push_time = Date.now();
    auction.expire_time = new Date(Date.now() + rule.auction_time_limit * 60 * 1000);
    auction.status = 0;

    const result = await saveAuctionRepository(auction);
    const io = getIO();
    io.emit("new-auction", result);

    return {
      success: true,
      message: "Player added to auction.",
      data: result
    };

  } catch (error) {
    return {
      success: false,
      message: "Failed to add player to auction.",
      error: error.message,
      isServerError: true
    };
  }
};

export const updateAuctionStateService = async (auctionId) => {
  try {
    const result = await updateAuctionRepository(auctionId);
    
  } catch (error) {
    return {
      success: false,
      message: "Failed to update auction state.",
      error: error.message,
      isServerError: true
    };
  }
}
