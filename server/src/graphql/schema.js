import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { users, user } from "./queries";
import { register, login } from "./mutations";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    users,
    user,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register,
    login,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
