import { getTeamsService, saveTeamService } from "../services/team.service.mjs";
import { successResponse } from "../utils/apiResponse.mjs";

export const getTeams = async(req, res, next) => {
    try {
        const result = await getTeamsService();
        res.status(200).json(successResponse("Teams retrieved successfully", result));
    } catch (error) {
        next(error);
    }
};

export const createTeam = async(req, res, next) => {
    try {
        const result = await getTeamsService();
        res.status(200).json(successResponse("Teams retrieved successfully", result));
    } catch (error) {
        next(error);
    }
}

export const saveTeam = async(req, res, next) => {
    try {
        const result = await saveTeamService(req.body);
        res.status(201).json(successResponse("Teams created successfully", result));
    } catch (error) {
        next(error);
    }
};