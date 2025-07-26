import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { saveBidController } from "../controllers/bid.controller.mjs";
import { bidCreateValidation } from "../validations/bid.validation.mjs";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";


const bidRouter = Router();

bidRouter.get('/')
bidRouter.post('/', authMiddleware, bidCreateValidation, handleValidationErrors("Bid create validation failed"), saveBidController)

export default bidRouter;