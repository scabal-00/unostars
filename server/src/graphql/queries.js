import { GraphQLList, GraphQLString, GraphQLID } from "graphql";
import { UserType } from "./types";
import { User } from "../models";

const users = {
  type: new GraphQLList(UserType),
  description: "Returns a list of users",
  resolve() {
    return User.find();
  },
};

const user = {
  type: UserType,
  description: "Get a user by id",
  args: {
    userId: { type: GraphQLID },
  },
  resolve(_, args) {
    return User.findOne({ userId: args.userId });
  },
};

module.exports = { users, user };
