import Auction from "../models/auction.model.mjs";

export const getAuctionRepository = async () => {
  return await Auction.findOne({ status: 0 }).populate({
      path: 'player_id',
      populate: { path: 'user_id' }
    });
};
export const saveAuctionRepository = async (auction) => {
  return await Auction.create(auction);
};
