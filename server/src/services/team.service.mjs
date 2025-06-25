import transport from "../configs/nodemailer.mjs";
import Team from "../models/team.model.mjs";
import User from "../models/user.model.mjs";
import { getTeamsRepository, saveTeamRepository } from "../repositories/team.repository.mjs";
import { ErrorResponse } from "../utils/ErrorResponse.mjs";
import bcrypt from "bcryptjs";

export const getTeamsService = async() => {
    
    const teams = await getTeamsRepository();

    return teams;
}

export const saveTeamService = async(teamData) => {

    const errors = {};

    const isUserExit = await User.findOne({ email: teamData.email });
    if (isUserExit) errors.email = "Email already exists";
    
    const isContactExit = await User.findOne({ contactNumber: teamData.contactNumber });
    if (isContactExit) errors.contactNumber = "Contact number already exists";

    const isTeamExit = await Team.findOne({ name: teamData.name });
    if (isTeamExit) errors.teamName = "Team name already exists";

    if (Object.keys(errors).length > 0) {
        throw new ErrorResponse("Team save failed", 400, errors);
    }

    const hashedPassword = await bcrypt.hash('Team@1234', 10);

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

   const  team = {
        name: teamData.name,
        status: teamData.teamStatus,
        logo: "user.png",
    }

    const { savedTeam, savedUser } = await saveTeamRepository(teamOwner, team);

    const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: savedUser.email,
    subject: "Welcome to LPL",
    text: `Hello ${savedUser.name}, welcome to Lanka Premier League. We are excited to have you join us!`,
    };

    await transport.sendMail(mailOptions);

    return savedTeam;   
}