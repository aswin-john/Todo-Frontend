import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const test = (req, res, next) => {
  res.json({ message: "api router" });
};
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errorHandler(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1]; // Extract the token after "Bearer "

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user; // Attach user info to the request object
    next();
  });
};
// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(errorHandler(401, "unauthorised"));
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, "forbidden"));
//     req.user = user;
//     next();
//   });
// };
