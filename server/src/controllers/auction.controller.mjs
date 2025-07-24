import { getAuctionService, saveAuctionService } from "../services/auction.service.mjs";

export const getAuctionsController = async (req, res) => {
  try {
    const result = await getAuctionService();

    if (result.success) {
      return res.status(200).json(result);
    }

    const status = result.isServerError ? 500 : 404;
    return res.status(status).json(result);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message
    });
  }
};
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
