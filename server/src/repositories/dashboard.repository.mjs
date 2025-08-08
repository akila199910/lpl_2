import Player from "../models/player.model.mjs";
import { successResponse } from "../utils/apiResponse.mjs";


  export const getDashboardRepository = async () => {
    const result = await Player.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);
  
    // Initialize all statuses with 0
    const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  
    // Fill in actual counts from DB result
    result.forEach(r => {
      counts[r._id] = r.count;
    });
  
    return successResponse("dashboard data", counts);
}