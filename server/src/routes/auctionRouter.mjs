import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getAuctionsController, saveAuctionController } from "../controllers/auction.controller.mjs";
import { auctionCreateValidation } from "../validations/auction.validation.mjs";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";


const auctionRouter = Router();

auctionRouter.get('/', authMiddleware, getAuctionsController);
auctionRouter.post('/', authMiddleware, auctionCreateValidation, handleValidationErrors("Auction create validation failed"), saveAuctionController);

export default auctionRouter;