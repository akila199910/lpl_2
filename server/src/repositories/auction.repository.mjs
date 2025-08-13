import Auction from "../models/auction.model.mjs";
import Bid from "../models/bid.model.mjs"
import Team from "../models/team.model.mjs"

export const getAuctionRepository = async () => {
  return await Auction.findOne({ status: 0 }).populate({
      path: 'player_id',
      populate: { path: 'user_id' }
    });
};
export const saveAuctionRepository = async (auction) => {
  return await Auction.create(auction);
};

export const updateAuctionRepository = async (auctionId) => {
  const auction = await Auction.findByIdAndUpdate(auctionId,{ status: 1 },{ new: true });
  const maxBid = await Bid.find({ auction_id: auction.id, player_id: auction.player_id })
    .sort({ bid_value: -1 })
    .limit(1);

    const team = await Team.findById(maxBid[0].team_id);
    let old_bid_cost = team.total_bids;
    team.total_bids = old_bid_cost + maxBid[0].bid_value;
    team.player_ids.push(maxBid[0].player_id);
    await team.save();
    console.log(team);

  return auction;
};
