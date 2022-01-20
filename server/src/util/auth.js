import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config";

const createJWTToken = (user) => {
  return jwt.sign({ user }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

module.exports = {
  createJWTToken,
};
