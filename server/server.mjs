import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import cors from "cors"; 
import { errorHandlerMiddleware } from "./src/middlewares/errorHandlerMiddleware.mjs";
import authRouter from "./src/routes/auth.router.mjs";
import userRouter from "./src/routes/user.route.mjs";
import teamRouter from "./src/routes/team.route.mjs";
import playerRouter from "./src/routes/player.route.mjs";
import bidRouter from "./src/routes/bidRouter.mjs";
import settingRouter from "./src/routes/settingsRouter.mjs";
import auctionRouter from "./src/routes/auctionRouter.mjs";



dotenv.config();
const server = express();
server.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,              
  }));
server.use(cookieParser());
server.use(express.json());

server.use("/auth", authRouter);
server.use("/users", userRouter);
server.use("/teams", teamRouter);
server.use("/players", playerRouter);
server.use("/bids", bidRouter);
server.use("/settings", settingRouter);
server.use("/auctions", auctionRouter);
server.use(errorHandlerMiddleware);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port', process.env.PORT || 5000);
    });
  })
  .catch(err => console.log('DB connection error:', err));

