import User from "../models/user.model.mjs";
import Team from "../models/team.model.mjs";
import { successResponse, errorResponse } from "../utils/apiResponse.mjs";
import bcrypt from "bcryptjs";
import {
  getTeamsRepository,
  saveTeamRepository,
  updateTeamRepository,
  getTeamByIdRepository,
  deleteTeamRepository,
} from "../repositories/team.repository.mjs";
import transport from "../configs/nodemailer.mjs";

export const getTeamsService = async () => {
  const teams = await getTeamsRepository();
  return successResponse("Teams fetched successfully", teams);
};

export const createTeamService = async () => {
  return successResponse("Render team create form");
};

export const saveTeamService = async (teamData) => {
  const errors = {};
  if (await User.findOne({ email: teamData.email })) errors.email = "Email already exists";
  if (await User.findOne({ contactNumber: teamData.contactNumber })) errors.contactNumber = "Contact number already exists";
  if (await Team.findOne({ name: teamData.name })) errors.teamName = "Team name already exists";
  if (Object.keys(errors).length > 0) return errorResponse("Validation failed", errors);

  const hashedPassword = await bcrypt.hash("Team@1234", 10);

  const teamOwner = {
    firstName: teamData.firstName,
    lastName: teamData.lastName,
    name: `${teamData.firstName} ${teamData.lastName}`,
    contactNumber: teamData.contactNumber,
    status: teamData.userStatus,
    email: teamData.email,
    password: hashedPassword,
    country: teamData.country,
    role: teamData.role,
  };

  const team = {
    name: teamData.name,
    status: teamData.teamStatus,
    logo: "user.png",
  };

  const { savedTeam, savedUser } = await saveTeamRepository(teamOwner, team);

  await transport.sendMail({
    from: process.env.MAIL_FROM_ADDRESS,
    to: savedUser.email,
    subject: "Welcome to LPL",
    text: `Hello ${savedUser.name}, welcome to Lanka Premier League!`,
  });

  return successResponse("Team created successfully", savedTeam);
};

export const getTeamByIdService = async (id) => {
  const team = await getTeamByIdRepository(id);
  return successResponse("Team fetched", team);
};

export const updateTeamService = async (teamData) => {
  const errors = {};
  if (await User.findOne({ email: teamData.email, _id: { $ne: teamData.userId } })) errors.email = "Email already exists";
  if (await User.findOne({ contactNumber: teamData.contactNumber, _id: { $ne: teamData.userId } })) errors.contactNumber = "Contact number already exists";
  if (await Team.findOne({ name: teamData.name, _id: { $ne: teamData.teamId } })) errors.teamName = "Team name already exists";
  if (Object.keys(errors).length > 0) return errorResponse("Validation failed", errors);

  const teamOwner = {
    firstName: teamData.firstName,
    lastName: teamData.lastName,
    name: `${teamData.firstName} ${teamData.lastName}`,
    contactNumber: teamData.contactNumber,
    status: teamData.userStatus,
    email: teamData.email,
    country: teamData.country,
    role: teamData.role,
    id: teamData.userId,
  };

  const team = {
    name: teamData.name,
    status: teamData.teamStatus,
    logo: "user.png",
    id: teamData.teamId,
  };

  const { updatedTeam } = await updateTeamRepository(teamOwner, team);
  return successResponse("Team updated successfully", updatedTeam);
};

export const deleteTeamService = async (id) => {
  await deleteTeamRepository(id);
  return successResponse("Team deleted");
};