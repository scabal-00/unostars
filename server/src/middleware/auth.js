import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || "";
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    console.log(verified);
    req.verifiedUser = verified.user;
    next();
  } catch (error) {
    console.error("error:", error);
    next(); //Temporal for demo purposes
  }
};

module.exports = {
  authenticate,
};
