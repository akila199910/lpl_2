import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getSettingController, updateSettingController } from "../controllers/settings.controller.mjs";



const settingRouter = Router();

settingRouter.get('/', authMiddleware, getSettingController );
settingRouter.put('/', authMiddleware, updateSettingController );


export default settingRouter;