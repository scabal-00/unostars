import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } from "graphql";
import {
  UserLevelType,
  UserType,
  QuestionType,
  TopicType,
  GlobalTopicType,
  QuizType,
  UserQuizType,
  PostType,
  CommentType,
} from "./types";
import {
  Post,
  Comment,
  User,
  GlobalTopic,
  Topic,
  Question,
  Quiz,
  UserQuiz,
} from "../models";

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
  type: new GraphQLList(GlobalTopicType),
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
  type: new GraphQLList(GlobalTopicType),
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
  type: new GraphQLList(GlobalTopicType),
  description: "Get the quizzes list",
  resolve: () => Quiz.find(),
};

const quiz = {
  type: QuizType,
  description: "retrieves a single quiz",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => Quiz.findById(id),
};

const userQuizzes = {
  type: new GraphQLList(GlobalTopicType),
  description: "Get the user quizzes list",
  resolve: () => UserQuiz.find(),
};

const userQuiz = {
  type: UserQuizType,
  description: "retrieves a single user quiz",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => UserQuiz.findById(id),
};

const posts = {
  type: new GraphQLList(PostType),
  description: "retrieves a list of posts",
  resolve: () => Post.find(),
};

const post = {
  type: PostType,
  description: "retrieves a single post",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => Post.findById(id),
};

const comments = {
  type: new GraphQLList(CommentType),
  description: "Retrieves list of commnets",
  resolve: () => Comment.find(),
};

const comment = {
  type: CommentType,
  description: "Retrieves a single comment",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => Comment.findById(id),
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
  posts,
  post,
  comments,
  comment,
};
