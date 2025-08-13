import {
  getTeamsService,
  createTeamService,
  saveTeamService,
  getTeamByIdService,
  updateTeamService,
  deleteTeamService,
} from "../services/team.service.mjs";

export const getTeamsController = async (req, res) => {
  const result = await getTeamsService();
  return res.status(result.success ? 200 : 400).json(result);
};

export const createTeamController = async (req, res) => {
  const result = await createTeamService();
  return res.status(result.success ? 200 : 400).json(result);
};

export const saveTeamController = async (req, res) => {
  const result = await saveTeamService(req.body);
  return res.status(result.success ? 201 : 400).json(result);
};

export const getTeamByIdController = async (req, res) => {
  const result = await getTeamByIdService(req.params.id);
  return res.status(result.success ? 200 : 400).json(result);
};


export const updateTeamController = async (req, res) => {
  const result = await updateTeamService(req.body);
  return res.status(result.success ? 200 : 400).json(result);
};

export const deleteTeamController = async (req, res) => {
  const result = await deleteTeamService(req.params.id);
  return res.status(result.success ? 200 : 400).json(result);
};