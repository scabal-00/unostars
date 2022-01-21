import { GraphQLSchema, GraphQLObjectType } from "graphql";

// Queries
import { users, user, globalTopics, globalTopic } from "./queries";

// Mutations
import {
  register,
  login,
  createGlobalTopic,
  updateGlobalTopic,
  deleteGlobalTopic,
  createTopic,
  updateTopic,
  deleteTopic,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  createQuiz,
  createUserQuiz,
} from "./mutations";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    users,
    user,
    globalTopics,
    globalTopic,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    register,
    login,
    createGlobalTopic,
    updateGlobalTopic,
    deleteGlobalTopic,
    createTopic,
    updateTopic,
    deleteTopic,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    createQuiz,
    createUserQuiz,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
