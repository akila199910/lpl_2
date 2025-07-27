import { Router } from "express";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";
import { playerTeamUpdateValidation, playerUpdateValidation } from "../validations/player.validation.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getPlayerByIdController, getPlayersController, updatePlayerController, updatePlayerTeamController } from "../controllers/player.controller.mjs";



const playerRouter = Router();

playerRouter.get('/', authMiddleware, getPlayersController );
playerRouter.get('/:id', authMiddleware, getPlayerByIdController );
playerRouter.put('/', authMiddleware, playerUpdateValidation, handleValidationErrors('Player update validation failed'), updatePlayerController );
playerRouter.put('/team', authMiddleware, playerTeamUpdateValidation, handleValidationErrors('Player team update validation failed'), updatePlayerTeamController );


export default playerRouter;