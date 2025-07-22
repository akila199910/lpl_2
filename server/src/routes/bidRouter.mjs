import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { saveBidController } from "../controllers/bid.controller.mjs";


const bidRouter = Router();

bidRouter.get('/')
bidRouter.post('/', authMiddleware, saveBidController)

export default bidRouter;