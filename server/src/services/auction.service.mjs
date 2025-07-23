import Rule from "../models/rule.model.mjs";
import { saveAuctionRepository } from "../repositories/auction.repository.mjs";

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
