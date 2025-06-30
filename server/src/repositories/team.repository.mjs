import Team from "../models/team.model.mjs";
import User from "../models/user.model.mjs";
import userProfileModel from "../models/userProfile.model.mjs";

export const getTeamsRepository = async () => {
  return await Team.find().populate("owner_id");
};

export const getTeamByIdRepository = async (id) => {
  return await Team.findById(id).populate("owner_id");
};

export const saveTeamRepository = async (teamOwner, teamData) => {
  const user = new User(teamOwner);
  const savedUser = await user.save();

  const userProfile = new userProfileModel({
    user: savedUser._id,
    profileImageUrl: "user.png",
  });
  await userProfile.save();

  const team = new Team({ ...teamData, owner_id: savedUser._id });
  const savedTeam = await team.save();

  return { savedTeam, savedUser };
};

export const updateTeamRepository = async (teamOwner, teamData) => {
  const updatedUser = await User.findByIdAndUpdate(
    teamOwner.id,
    {
      firstName: teamOwner.firstName,
      lastName: teamOwner.lastName,
      name: teamOwner.name,
      contactNumber: teamOwner.contactNumber,
      status: teamOwner.status,
      email: teamOwner.email,
      country: teamOwner.country,
      role: teamOwner.role,
    },
    { new: true }
  );

  const updatedTeam = await Team.findByIdAndUpdate(
    teamData.id,
    {
      name: teamData.name,
      status: teamData.status,
      logo: teamData.logo,
    },
    { new: true }
  );

  return { updatedTeam, updatedUser };
};

export const deleteTeamRepository = async (id) => {
  return await Team.findByIdAndDelete(id);
};