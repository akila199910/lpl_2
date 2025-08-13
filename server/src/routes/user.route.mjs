import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getMyProfile, getUserByNameController } from "../controllers/user.controller.mjs";

const userRouter = Router();

userRouter.get("/my-profile", authMiddleware, getMyProfile );
userRouter.get("/:name",authMiddleware, getUserByNameController)

export default userRouter;