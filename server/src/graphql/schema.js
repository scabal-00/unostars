import { GraphQLSchema, GraphQLObjectType } from "graphql";

// Queries
import {
  users,
  user,
  globalTopics,
  globalTopic,
  topics,
  topic,
  questions,
  question,
  quizzes,
  quiz,
  userQuizzes,
  userQuiz,
} from "./queries";

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
  updateQuiz,
  deleteQuiz,
  createUserQuiz,
  updateUserQuiz,
  deleteUserQuiz,
} from "./mutations";

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    users,
    user,
    globalTopics,
    globalTopic,
    topics,
    topic,
    questions,
    question,
    quizzes,
    quiz,
    userQuizzes,
    userQuiz,
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
    updateQuiz,
    deleteQuiz,
    createUserQuiz,
    updateUserQuiz,
    deleteUserQuiz,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
