import Bid from "../models/bid.model.mjs";

export const getBidRepository = async () => {
  return await Bid.find();
};


export const getHighestBidsByAuction = async (auctionId) => {
  return await Bid.aggregate([
    {
      $match: {
        auction_id: auctionId
      }
    },
    {
      $sort: { bid_value: -1 }
    },
    {
      $group: {
        _id: "$team_id",
        team_id: { $first: "$team_id" },
        bid_value: { $first: "$bid_value" },
        auction_id: { $first: "$auction_id" },
        player_id: { $first: "$player_id" }
      }
    },
    {
      $lookup: {
        from: "teams", // collection name (not model name)
        localField: "team_id",
        foreignField: "_id",
        as: "team"
      }
    },
    {
      $unwind: "$team" // convert team array to object
    }
  ]);
};

export const saveBidRepository = async (bidData) => {
  
  const bid = new Bid(bidData);
  const saved = await bid.save();
  const highestBidsArray = await getHighestBidsByAuction(saved.auction_id);
  return highestBidsArray;
};
