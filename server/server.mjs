import express from "express";
import authRouter from "./routes/auth/auth.router.mjs";


const server = express();
server.use(express.json());

server.use("/auth", authRouter);

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});