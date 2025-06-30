import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/apiResponse.mjs";

export const authMiddleware = (req, res, next) => {
  try {

    const token = req.cookies.token;
    if (!token) return res.status(401).json(errorResponse("No token provided", null));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.body.id = decoded.id;
    req.user = {
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    res.status(500).json(errorResponse("Server error auth middleware",error));
  }
};
