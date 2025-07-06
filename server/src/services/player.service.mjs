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

export const savePlayerService = async (playerData) => {

  const existingPlayer = await Player.findOne({ user_id: playerData.user_id });

  let player, user;

  if (existingPlayer) {
    ({ player, user } = await updatePlayerRepository(existingPlayer._id, playerData));

  } 
  else {
    ({ player, user } = await savePlayerRepository(playerData)
      // await transport.sendMail({
      //   from: process.env.MAIL_FROM_ADDRESS,
      //   to: user.email,
      //   subject: "Approval Request",
      //   text: `Hello ${user.name}, Your player request has been approved!`,
      // });
    );
  }

  return successResponse("Player saved successfully", player);
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