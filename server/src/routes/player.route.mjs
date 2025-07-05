import { Router } from "express";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";
import { playerCreateValidation } from "../validations/player.validation.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getPlayerByIdController, getPlayersController, savePlayerController } from "../controllers/player.controller.mjs";



const playerRouter = Router();

playerRouter.get('/', authMiddleware, getPlayersController );
playerRouter.get('/:id', authMiddleware, getPlayerByIdController );
playerRouter.post('/', authMiddleware, playerCreateValidation, handleValidationErrors('Player create validation failed'), savePlayerController );

// playerRouter.post('/:id', playerCreateValidation, handleValidationErrors('Player validation failed'), createPlayerController );


export default playerRouter;