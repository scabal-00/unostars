import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } from "graphql";
import { UserType, PostType, CommentType, GlobalTopicType } from "./types";
import { User, Post, Comment, GlobalTopic } from "../models";

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
  description: "Get the topics list",
  resolve: () => GlobalTopic.find(),
};

const globalTopic = {
  type: GlobalTopicType,
  description: "retrieves a single global topic",
  args: { id: { type: GraphQLID } },
  resolve: (_, { id }) => GlobalTopic.findById(id),
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
  posts,
  post,
  comments,
  comment,
  globalTopics,
  globalTopic,
};
