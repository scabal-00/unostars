import { config } from "dotenv";
config();

const IP_SERVER = process.env.MONGODB_IP || "localhost";
const PORT_DB = process.env.PORT_DB || 27017;
const DB_NAME = process.env.DB_NAME || "unostar_development";
const PORT = process.env.PORT || 3007;
const JWT_SECRET = process.env.JWT_SECRET || "?,PXLYu1$wjH!TA";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://scabal-00:BufferedReader@cluster0.mxocf.mongodb.net/unostar_development?retryWrites=true&w=majority";

module.exports = {
  MONGODB_URI,
  IP_SERVER,
  PORT_DB,
  DB_NAME,
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
