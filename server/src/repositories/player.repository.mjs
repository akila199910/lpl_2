import Player from "../models/player.model.mjs";
import User from "../models/user.model.mjs";

export const getPlayerRepository = async () => {
  return await Player.find().populate({
      path: 'user_id',
      populate: { path: 'profile' }
    });
};

export const getPlayerByIdRepository = async (id) => {
  let player = await Player.findById(id)
    .populate({
      path: 'user_id',
      populate: { path: 'profile' }
    });

  return player;
};

export const savePlayerRepository = async (playerData) => {

  const player = await Player.create(playerData);
  const user = await User.findById(playerData.user_id);
        user.status = 1;
        await user.save();


  return { player, user };
};

export const updatePlayerRepository = async (playerData) => {
 const  updateData = { batting_style: playerData.batting_style,
     bowling_style: playerData.bowling_style,
     batting_average: playerData.batting_average,
     bowling_average: playerData.bowling_average,
     batting_strike_rate: playerData.batting_strike_rate,
     bowling_strike_rate: playerData.bowling_strike_rate,
     batting_high_score: playerData.batting_high_score,
     batting_runs: playerData.batting_runs,
     bowling_wickets: playerData.bowling_wickets,
     bowling_economy: playerData.bowling_economy,
     number_of_hundreds: playerData.number_of_hundreds,
     number_of_fifties: playerData.number_of_fifties,
     number_of_matches: playerData.number_of_matches,
     number_of_innings: playerData.number_of_innings,
     number_of_catches: playerData.number_of_catches,
     number_of_stumpings: playerData.number_of_stumpings,
     status: playerData.status
     
    };
  const player = await Player.findByIdAndUpdate(playerData.playerId, updateData, { new: true });

  return player;
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