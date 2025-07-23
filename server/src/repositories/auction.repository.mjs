import Auction from "../models/auction.model.mjs";

export const saveAuctionRepository = async (auction) => {
  return await Auction.create(auction);
};
