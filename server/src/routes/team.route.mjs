import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import {
  getTeamsController,
  createTeamController,
  saveTeamController,
  getTeamByIdController,
  updateTeamController,
  deleteTeamController,
} from "../controllers/team.controller.mjs";
import {
  teamCreateValidation,
  teamUpdateValidation,
} from "../validations/team.validation.mjs";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";

const teamRouter = Router();

teamRouter.get("/", authMiddleware, getTeamsController);
teamRouter.get("/create", authMiddleware, createTeamController);
teamRouter.post("/", authMiddleware, teamCreateValidation,  handleValidationErrors("Team create validation failed"), saveTeamController);
teamRouter.get("/:id", authMiddleware, getTeamByIdController);
teamRouter.put("/", authMiddleware, teamUpdateValidation, handleValidationErrors("Team update validation failed"), updateTeamController);
teamRouter.delete("/:id", authMiddleware, deleteTeamController);

export default teamRouter;