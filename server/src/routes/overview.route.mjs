import { Router } from "express";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getOverviewController } from "../controllers/overview.controller.mjs";



const overviewRouter = Router();

overviewRouter.get('/', authMiddleware,  getOverviewController);
// overviewRouter.get('/:id', authMiddleware, getPlayerByIdController );
// overviewRouter.put('/', authMiddleware, playerUpdateValidation, handleValidationErrors('Player update validation failed'), updatePlayerController );
// overviewRouter.put('/team', authMiddleware, playerTeamUpdateValidation, handleValidationErrors('Player team update validation failed'), updatePlayerTeamController );


export default overviewRouter;