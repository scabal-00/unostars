import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import { Post, Comment, User } from "../models";

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    email: { type: GraphQLString },
    photo: { type: GraphQLString },
    role: { type: GraphQLString },
    level: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "Post Type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.authorId);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent) {
        return Comment.find({ postId: parent.id });
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  description: "comments type",
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.userId);
      },
    },
    post: {
      type: PostType,
      resolve(parent) {
        return Post.findById(parent.postId);
      },
    },
  }),
});

module.exports = {
  UserType,
  PostType,
  CommentType,
};
