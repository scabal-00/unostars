import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserScheme = new Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  phoneStatus: Number,
  password: String,
  role: String,
  active: Boolean,
});

module.exports = mongoose.model("User", UserScheme);
