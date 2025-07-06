import User from "../models/user.model.mjs";
import Player from "../models/player.model.mjs";

export const getPlayerRepository = async () => {
  return await User.find({
    role: { $in: ['Batsman', 'Bowler', 'Allrounder', 'Wicket Keeper'] }
  }).populate('profile');
};


export const getPlayerByIdRepository = async (id) => {
  let player = await Player.findOne({ user_id: id })
    .populate({
      path: 'user_id',
      populate: { path: 'profile' }
    });

  if (!player) {
    const user = await User.findById(id).populate('profile');
    return user;
  }

  return player;
};

export const savePlayerRepository = async (playerData) => {

  const player = await Player.create(playerData);
  const user = await User.findById(playerData.user_id);
        user.status = 1;
        await user.save();


  return { player, user };
};

export const updatePlayerRepository = async (playerId, updateData) => {
  const player = await Player.findByIdAndUpdate(playerId, updateData, { new: true });
  const user = await User.findById(updateData.user_id);
  user.status = 1;
  await user.save();

  return { player, user };
};


// export const updateTeamRepository = async (teamOwner, teamData) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     teamOwner.id,
//     {
//       firstName: teamOwner.firstName,
//       lastName: teamOwner.lastName,
//       name: teamOwner.name,
//       contactNumber: teamOwner.contactNumber,
//       status: teamOwner.status,
//       email: teamOwner.email,
//       country: teamOwner.country,
//       role: teamOwner.role,
//     },
//     { new: true }
//   );

//   const updatedTeam = await Team.findByIdAndUpdate(
//     teamData.id,
//     {
//       name: teamData.name,
//       status: teamData.status,
//       logo: teamData.logo,
//     },
//     { new: true }
//   );

//   return { updatedTeam, updatedUser };
// };

// export const deleteTeamRepository = async (id) => {
//   return await Team.findByIdAndDelete(id);
// };