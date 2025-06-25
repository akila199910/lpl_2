import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getTeams, createTeam, saveTeam, } from "../controllers/team.controller.mjs";
import { teamCreateValidatin } from "../validations/team.validation.mjs";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";


const teamRouter = Router();

teamRouter.get("/", authMiddleware, getTeams );
teamRouter.get("/create", authMiddleware, createTeam );
teamRouter.post("/", authMiddleware, teamCreateValidatin, handleValidationErrors("Team validation failed"), saveTeam );
// teamRouter.get("/:id", authMiddleware, getTeamById );
// teamRouter.put("/:id", authMiddleware, updateTeam );
// teamRouter.delete("/:id", authMiddleware, deleteTeam );

export default teamRouter;