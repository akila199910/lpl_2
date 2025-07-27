import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getBidController, saveBidController } from "../controllers/bid.controller.mjs";
import { bidCreateValidation, getBidValidation } from "../validations/bid.validation.mjs";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";


const bidRouter = Router();

bidRouter.get('/', authMiddleware, getBidValidation, handleValidationErrors("Bid get validation failed"), getBidController);
bidRouter.post('/', authMiddleware, bidCreateValidation, handleValidationErrors("Bid create validation failed"), saveBidController);
// bidRouter.put('/', authMiddleware, updateBidController);

export default bidRouter;