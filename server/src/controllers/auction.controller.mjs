import { saveAuctionService } from "../services/auction.service.mjs";
export const saveAuctionController = async (req, res) => {
  try {
    const result = await saveAuctionService(req.body);

    if (!result.success) {
        return res.status(400).json(result); 
    } else {    
        return res.status(201).json(result);
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
};
