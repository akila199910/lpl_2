import {  getPlayerByIdService, getPlayersService, updatePlayerService, updatePlayerTeamService } from "../services/player.service.mjs";


export const getPlayersController = async (req, res) => {
  const result = await getPlayersService();
  return res.status(result.success ? 200 : 400).json(result);
};

export const updatePlayerController = async (req, res) => {
  const result = await updatePlayerService(req.body);
  return res.status(result.success ? 200 : 400).json(result);
};

export const getPlayerByIdController = async (req, res) => {
  const result = await getPlayerByIdService(req.params.id);
  return res.status(result.success ? 200 : 400).json(result);
};

export const updatePlayerTeamController = async (req, res) => {
  const result = await updatePlayerTeamService(req.body);
  return res.status(result.success ? 200 : 400).json(result);
}
// export const updateTeamController = async (req, res) => {
//   const result = await updateTeamService(req.body);
//   return res.status(result.success ? 200 : 400).json(result);
// };

// export const deleteTeamController = async (req, res) => {
//   const result = await deleteTeamService(req.params.id);
//   return res.status(result.success ? 200 : 400).json(result);
// };