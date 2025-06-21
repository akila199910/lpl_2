import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/apiResponse.mjs";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(errorResponse("No token provided"));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.id = decoded.id;
    
    req.user = {
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    res.status(401).json(errorResponse("Invalid or expired token"));
  }
};
