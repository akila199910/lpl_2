import { getPlayerByIdRepository, getPlayerRepository, savePlayerRepository, updatePlayerRepository } from "../repositories/player.repository.mjs";
import { successResponse, errorResponse } from "../utils/apiResponse.mjs";
import Player from "../models/player.model.mjs";

export const getPlayersService = async () => {
  const players = await getPlayerRepository();
  return successResponse("Players fetched successfully", players);
};

// export const createTeamService = async () => {
//   return successResponse("Render team create form");
// };

export const updatePlayerService = async (playerData) => {
  
  const player = await updatePlayerRepository(playerData);
if (!player) {
    return errorResponse("Player not found or update failed", {});
}
return successResponse("Player updated successfully", player);
// console.log("shbgewfckwe")
// console.log(playerData)  
// const player = await updatePlayerRepository(playerData);
//   return successResponse("Player updated successfully", player);
};






export const getPlayerByIdService = async (id) => {
  const player = await getPlayerByIdRepository(id);
  return successResponse("Player fetched", player);
};

// export const updateTeamService = async (teamData) => {
//   const errors = {};
//   if (await User.findOne({ email: teamData.email, _id: { $ne: teamData.userId } })) errors.email = "Email already exists";
//   if (await User.findOne({ contactNumber: teamData.contactNumber, _id: { $ne: teamData.userId } })) errors.contactNumber = "Contact number already exists";
//   if (await Team.findOne({ name: teamData.name, _id: { $ne: teamData.teamId } })) errors.teamName = "Team name already exists";
//   if (Object.keys(errors).length > 0) return errorResponse("Validation failed", errors);

//   const teamOwner = {
//     firstName: teamData.firstName,
//     lastName: teamData.lastName,
//     name: `${teamData.firstName} ${teamData.lastName}`,
//     contactNumber: teamData.contactNumber,
//     status: teamData.userStatus,
//     email: teamData.email,
//     country: teamData.country,
//     role: teamData.role,
//     id: teamData.userId,
//   };

//   const team = {
//     name: teamData.name,
//     status: teamData.teamStatus,
//     logo: "user.png",
//     id: teamData.teamId,
//   };

//   const { updatedTeam } = await updateTeamRepository(teamOwner, team);
//   return successResponse("Team updated successfully", updatedTeam);
// };

// export const deleteTeamService = async (id) => {
//   await deleteTeamRepository(id);
//   return successResponse("Team deleted");
// };