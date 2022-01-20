import { GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLID } from "graphql";
const { auth } = require("../util");
import { User } from "../models";

const register = {
  type: GraphQLString,
  description: "Register a new user and returns a token",
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    email: { type: new GraphQLNonNull(GraphQLString) },
    photo: { type: GraphQLString },
    role: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args) {
    const { userId, name, age, email, photo, role } = args;

    const user = new User({ userId, name, age, email, photo, role });
    // user.password = await bcrypt.encryptPassword(user.password);
    await user.save();

    const token = auth.createJWTToken({
      _id: user._id,
      userId: user.userId,
      email: user.email,
      name: user.name,
      photo: user.photo,
    });

    console.log(token);

    return token;
  },
};

const login = {
  type: GraphQLString,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, args) {
    console.log(args);

    const user = await User.findOne({ userId: args.userId });

    if (!user) throw new Error("Invalid Credentials");

    const token = auth.createJWTToken({
      _id: user._id,
      userId: user.userId,
      email: user.email,
      name: user.name,
      photo: user.photo,
    });

    return token;
  },
};

module.exports = {
  register,
  login,
};
