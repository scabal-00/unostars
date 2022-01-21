import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from "graphql";
import {
  Post,
  Comment,
  User,
  Question,
  Topic,
  GlobalTopic,
  Quiz,
} from "../models";

const UserLevelType = new GraphQLObjectType({
  name: "LevelInput",
  description: "Shows the skill level of the user",
  fields: () => ({
    userLevel: { type: GraphQLString },
    professionalLevel: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    photo: { type: GraphQLString },
    role: { type: GraphQLString },
    level: { type: UserLevelType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  description: "Question type",
  fields: () => ({
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    topic: {
      type: new GraphQLList(TopicType),
      resolve(parent) {
        return Topic.find({
          questionId: [parent.id],
        });
      },
    },
    /* private: {
      isPrivate: { type: GraphQLBoolean },
      users: {
        type: new GraphQLList(UserType),
        resolve(parent) {
          return User.find({ userId: parent.userId });
        },
      },
    },
    questionType: {
      name: { type: GraphQLString },
      dsc: { type: GraphQLString },
      options: [
        {
          id: { type: GraphQLID },
          dsc: { type: GraphQLString },
          isAnswer: { type: GraphQLBoolean },
        },
      ],
    }, */
    difficulty: { type: GraphQLInt },
    questionScore: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const TopicType = new GraphQLObjectType({
  name: "Topic",
  description: "Topic type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    gTopic: {
      type: GlobalTopicType,
      resolve(parent) {
        return GlobalTopic.findById(parent.gTopic);
      },
    },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parent) {
        return Question.find({ topicsId: [parent.id] });
      },
    },
    difficulty: { type: GraphQLInt },
    topicScore: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const GlobalTopicType = new GraphQLObjectType({
  name: "GlobalTopic",
  description: "Global Topic type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    topics: {
      type: new GraphQLList(TopicType),
      resolve(parent) {
        return Topic.find({ gTopicsId: parent.id });
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const QuizType = new GraphQLObjectType({
  name: "Quiz",
  description: "Quiz type",
  fields: () => ({
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    photo: { type: GraphQLString },
    globalTopic: {
      type: GlobalTopicType,
      resolve(parent) {
        return GlobalTopic.findById(parent.globalTopicId);
      },
    },
    /* topics: [
      {
        topic: {
          type: TopicType,
          resolve(parent) {
            return Topic.findById(parent.topicId);
          },
        },
        selectedQuestionsId: {
          type: new GraphQLList(QuestionType),
          resolve(parent) {
            return Question.find({ topicsId: [parent.topicId] });
          },
        },
      },
    ], */
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const UserQuizType = new GraphQLObjectType({
  name: "UserQuiz",
  description: "UserQuiz type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    userId: {
      type: UserType,
      resolve(parent) {
        return User.findOne({ userId: parent.userId });
      },
    },
    remitterId: {
      type: UserType,
      resolve(parent) {
        return User.findOne({ userId: parent.remitterId });
      },
    },
    quiz: {
      type: QuizType,
      resolve(parent) {
        return Quiz.findById(parent.quizId);
      },
    },
    /* userAnswers: {
      selectedAnswers: [
        {
          questionId: {
            type: QuestionType,
            resolve(parent) {
              return Question.findById(parent.questionId);
            },
          },
          correctAnswer: { type: GraphQLString },
          userAnswer: { type: GraphQLString },
          score: { type: GraphQLInt },
        },
      ],
      countAnswers: {
        countCorrectAnswers: { type: GraphQLString },
        countWrongAnswers: { type: GraphQLString },
        totalQuestions: { type: GraphQLInt },
      },
      totalScore: { type: GraphQLInt },
    }, */
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
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
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
  UserLevelType,
  UserType,
  QuestionType,
  TopicType,
  GlobalTopicType,
  QuizType,
  UserQuizType,
  PostType,
  CommentType,
};
