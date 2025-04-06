import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import cookieParser from "cookie-parser";
import cors from "cors"; 
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.mjs";
import authRouter from "./routes/auth/auth.router.mjs";


dotenv.config();
const server = express();
server.use(cookieParser());
server.use(express.json());
server.use(cors({credentials: true}));
server.use("/auth", authRouter);
server.use(errorHandlerMiddleware);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    server.listen(process.env.PORT || 5000, () => {
        console.log('Server running on port', process.env.PORT || 5000);
    });
})
.catch(err => console.log('DB connection error:', err));
