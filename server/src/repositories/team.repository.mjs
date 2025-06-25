import Team from "../models/team.model.mjs";
import User from "../models/user.model.mjs";
import userProfileModel from "../models/userProfile.model.mjs";

export const getTeamsRepository = async () => {
    const teams = await Team.find().populate('owner_id', 'name email');
    return teams;
};

export const saveTeamRepository = async (teamOwner, teamData) => {
  const user = new User(teamOwner);
  const savedUser = await user.save();

  const userProfile = new userProfileModel();
  userProfile.user = savedUser._id;
  userProfile.profileImageUrl = "user.png";
  await userProfile.save();

  const team = new Team({ ...teamData, owner_id: savedUser._id });
  const savedTeam = await team.save();

  return { savedTeam, savedUser };
};
