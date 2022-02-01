import { GraphQLList, GraphQLID } from "graphql";
import {
  UserType,
  QuestionType,
  TopicType,
  GlobalTopicType,
  QuizType,
  UserQuizType,
} from "./types";
import { User, GlobalTopic, Topic, Question, Quiz, UserQuiz } from "../models";

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

const globalTopics = {
  type: new GraphQLList(GlobalTopicType),
  description: "Get the global topics list",
  resolve: () => GlobalTopic.find(),
};

const globalTopic = {
  type: GlobalTopicType,
  description: "retrieves a single global topic",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => GlobalTopic.findById(id),
};

const topics = {
  type: new GraphQLList(TopicType),
  description: "Get the topics list",
  resolve: () => Topic.find(),
};

const topic = {
  type: TopicType,
  description: "retrieves a single topic",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => Topic.findById(id),
};

const questions = {
  type: new GraphQLList(QuestionType),
  description: "Get the question list",
  resolve: () => Question.find(),
};

const question = {
  type: QuestionType,
  description: "retrieves a single question",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => Question.findById(id),
};

const quizzes = {
  type: new GraphQLList(QuizType),
  description: "Get the quizzes list",
  resolve: (_, {}) => Quiz.find(),
};

const quiz = {
  type: QuizType,
  description: "retrieves a single quiz",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => Quiz.findById(id),
};

const userQuizzes = {
  type: new GraphQLList(UserQuizType),
  description: "Get the user quizzes list",
  resolve: () => UserQuiz.find(),
};

const userQuiz = {
  type: UserQuizType,
  description: "retrieves a single user quiz",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => UserQuiz.findById(id),
};

module.exports = {
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
};
