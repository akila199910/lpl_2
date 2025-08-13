import Player from "../models/player.model.mjs";

export const getOverviewRepository = async (
  page = 1,
  limit = 10,
  role = "",
  rating = "" 
) => {
  const skip = (page - 1) * limit;

  const pipeline = [
    { $lookup: { from: "users", localField: "user_id", foreignField: "_id", as: "user" } },
    { $unwind: "$user" },
  ];

  const match = {};
  if (role) match["user.role"] = role;
  if (rating) match.base_price = parseInt(rating);
  console.log(match)

  

  if (Object.keys(match).length) pipeline.push({ $match: match });

  pipeline.push({
    $facet: {
      data: [
        { $sort: { _id: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: "$user.name",
            role: "$user.role",
            country: "$user.country",
            batting_average: 1,
            batting_strike_rate: 1,
            batting_high_score: 1,
            bowling_average: 1,
            bowling_wickets: 1,
            bowling_economy: 1,
            base_price: 1,
            number_of_stumpings: 1,
            number_of_hundreds: 1,
            number_of_fifties: 1,
          },
        },
      ],
      total: [{ $count: "count" }],
    },
  });

  const result = await Player.aggregate(pipeline);
  const overview = result[0]?.data ?? [];
  const total = result[0]?.total?.[0]?.count ?? 0;

  return { overview, total };
};

  