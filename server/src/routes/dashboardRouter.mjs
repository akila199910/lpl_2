import { Router } from "express";
import { handleValidationErrors } from "../middlewares/validationErrorHandler.mjs";
import { authMiddleware } from "../middlewares/authMiddleware.mjs";
import { getDashboardController } from "../controllers/dashboard.controller.mjs";


const dashboardRouter = Router();


dashboardRouter.get('/', authMiddleware,  getDashboardController);


export default dashboardRouter;