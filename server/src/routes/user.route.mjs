import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getMyProfile } from "../controllers/user.controller.mjs";

const userRouter = Router();

userRouter.get("/my-profile", authMiddleware, getMyProfile );

export default userRouter;