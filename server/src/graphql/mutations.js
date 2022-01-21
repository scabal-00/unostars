import {
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
} from "graphql";
const { auth } = require("../util");
import { User, GlobalTopic, Topic, Question, Quiz, UserQuiz } from "../models";
import {
  GlobalTopicType,
  TopicType,
  QuestionType,
  QuizType,
  UserQuizType,
} from "./types";

const register = {
  type: GraphQLString,
  description: "Register a new user and returns a token",
  args: {
    userId: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    photo: { type: GraphQLString },
    role: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, args) {
    const { userId, name, email, age, gender, photo, role } = args;

    const user = new User({
      userId,
      name,
      email,
      age,
      gender,
      photo,
      role,
    });
    // user.password = await bcrypt.encryptPassword(user.password);
    await user.save();

    const token = auth.createJWTToken({
      _id: user._id,
      userId: user.userId,
      email: user.email,
      name: user.name,
      photo: user.photo,
    });

    // console.log(token);

    return token;
  },
};

const login = {
  type: GraphQLString,
  description: "Login user and returns a token",
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

const createGlobalTopic = {
  type: GlobalTopicType,
  description: "create a new global topic",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    dsc: { type: GraphQLString },
  },
  async resolve(_, args, { verifiedUser }) {
    console.log(verifiedUser);
    if (!verifiedUser) throw new Error("You must be logged in to do that");

    const userFound = await User.findById(verifiedUser._id);
    if (!userFound) throw new Error("Unauthorized");

    const globalTopic = new GlobalTopic({
      title: args.title,
      dsc: args.dsc,
    });

    return globalTopic.save();
  },
};

const updateGlobalTopic = {
  type: GlobalTopicType,
  description: "update a global topic",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
  },
  async resolve(_, { id, title, dsc }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const globalTopicUpdated = await GlobalTopic.findOneAndUpdate(
      { _id: id /*, authorId: verifiedUser._id */ },
      { title, dsc },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!globalTopicUpdated) throw new Error("No global topic for given id");

    return globalTopicUpdated;
  },
};

const deleteGlobalTopic = {
  type: GraphQLString,
  description: "Delete global topic",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, args, { verifiedUser }) {
    const globalTopicDeleted = await GlobalTopic.findOneAndDelete({
      _id: args.id,
      /* authorId: verifiedUser._id, */
    });
    if (!globalTopicDeleted)
      throw new Error("No global topic with given ID Found for the user");

    return "Global Topic deleted";
  },
};

const createTopic = {
  type: TopicType,
  description: "create a new topic",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    dsc: { type: GraphQLString },
    gTopic: { type: GraphQLString },
    // questions: { type: GraphQLList },
    difficulty: { type: GraphQLInt },
    topicScore: { type: GraphQLInt },
  },
  async resolve(_, args, { verifiedUser }) {
    console.log(verifiedUser);
    if (!verifiedUser) throw new Error("You must be logged in to do that");

    const userFound = await User.findById(verifiedUser._id);
    if (!userFound) throw new Error("Unauthorized");

    const topic = new Topic({
      title: args.title,
      dsc: args.dsc,
      gTopic: args.gTopic,
      //   questions: [args.questions],
      difficulty: args.difficulty,
      topicScore: args.topicScore,
    });

    return topic.save();
  },
};

const updateTopic = {
  type: TopicType,
  description: "update a topic",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    gTopic: { type: GraphQLString },
    // questions: { type: GraphQLList },
    difficulty: { type: GraphQLInt },
    topicScore: { type: GraphQLInt },
  },
  async resolve(
    _,
    { id, title, dsc, gTopic, difficulty, topicScore },
    { verifiedUser }
  ) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const topicUpdated = await Topic.findOneAndUpdate(
      { _id: id /*, authorId: verifiedUser._id */ },
      { title, dsc, gTopic, difficulty, topicScore },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!topicUpdated) throw new Error("No topic for given id");

    return topicUpdated;
  },
};

const deleteTopic = {
  type: GraphQLString,
  description: "Delete topic",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, args, { verifiedUser }) {
    const topicDeleted = await Topic.findOneAndDelete({
      _id: args.id,
      /* authorId: verifiedUser._id, */
    });
    if (!topicDeleted)
      throw new Error("No topic with given ID Found for the user");

    return "Topic deleted";
  },
};

const createQuestion = {
  type: QuestionType,
  description: "create a new question",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    dsc: { type: GraphQLString },
    topic: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    questionScore: { type: GraphQLInt },
  },
  async resolve(_, args, { verifiedUser }) {
    console.log(verifiedUser);
    if (!verifiedUser) throw new Error("You must be logged in to do that");

    const userFound = await User.findById(verifiedUser._id);
    if (!userFound) throw new Error("Unauthorized");

    const question = new Question({
      title: args.title,
      dsc: args.dsc,
      topic: args.topic,
      //   questions: [args.questions],
      difficulty: args.difficulty,
      questionScore: args.questionScore,
    });

    return question.save();
  },
};

const updateQuestion = {
  type: QuestionType,
  description: "update a question",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    dsc: { type: GraphQLString },
    isActive: { GraphQLBoolean },
    topic: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    questionScore: { type: GraphQLInt },
    isActive: { type: GraphQLBoolean },
  },
  async resolve(
    _,
    { id, title, dsc, topic, difficulty, isActive, questionScore },
    { verifiedUser }
  ) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const questionUpdated = await Question.findOneAndUpdate(
      { _id: id /*, authorId: verifiedUser._id */ },
      { title, dsc, topic, difficulty, questionScore },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!questionUpdated) throw new Error("No question for given id");

    return questionUpdated;
  },
};

const deleteQuestion = {
  type: GraphQLString,
  description: "Delete question",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, args, { verifiedUser }) {
    const questionDeleted = await Question.findOneAndDelete({
      _id: args.id,
      /* authorId: verifiedUser._id, */
    });
    if (!questionDeleted)
      throw new Error("No question with given ID Found for the user");

    return "Question deleted";
  },
};

const createQuiz = {
  type: QuizType,
  description: "create a new quiz",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    dsc: { type: GraphQLString },
    photo: { type: GraphQLString },
    gTopic: { type: GraphQLString },
    /* topics: {
      topic: { type: TopicType },
      selectedQuestionsId: { type: GraphQLList },
    }, */
  },
  async resolve(_, args, { verifiedUser }) {
    console.log(verifiedUser);
    if (!verifiedUser) throw new Error("You must be logged in to do that");

    const userFound = await User.findById(verifiedUser._id);
    if (!userFound) throw new Error("Unauthorized");

    const quiz = new Quiz({
      title: args.title,
      dsc: args.dsc,
      photo: args.photo,
      //   gTopic: args.globalTopic,
      //   topics: args.topics,
    });

    return quiz.save();
  },
};

/* const updateQuiz = {
  type: PostType,
  description: "update a blog post",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { id, title, body }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const postUpdated = await Post.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },
      { title, body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!postUpdated) throw new Error("No post for given id");

    return postUpdated;
  },
};*/

const createUserQuiz = {
  type: UserQuizType,
  description: "Create a new comment for a blog post",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    dsc: { type: GraphQLString },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    remitterId: { type: GraphQLString },
    // questions: { type: GraphQLList },
    quizId: { type: GraphQLString },
    // userAnswers: { type: GraphQLInt },
  },
  resolve(_, args, { verifiedUser }) {
    const userQuiz = new UserQuiz({
      title: args.title,
      dsc: args.dsc,
      title: args.title,
      dsc: args.dsc,
      remitterId: args.remitterId,
      //   globalTopic: args.globalTopic,
      //   topics: args.topics,
      quizId: args.quizId,
    });
    return userQuiz.save();
  },
};

/* const updateUserQuiz = {
  type: CommentType,
  description: "update a comment",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    comment: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(_, { id, comment }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("UnAuthorized");

    const commentUpdated = await Comment.findOneAndUpdate(
      {
        _id: id,
        userId: verifiedUser._id,
      },
      {
        comment,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!commentUpdated) throw new Error("No comment with the given ID");

    return commentUpdated;
  },
};

const deleteUserQuiz = {
  type: GraphQLString,
  description: "delete a comment",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, { id }, { verifiedUser }) {
    if (!verifiedUser) throw new Error("Unauthorized");

    const commentDelete = await Comment.findOneAndDelete({
      _id: id,
      userId: verifiedUser._id,
    });

    if (!commentDelete)
      throw new Error("No comment with the given ID for the user");

    return "Comment deleted";
  },
};  */

module.exports = {
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
  /* updateQuiz,
  createUserQuiz,
  updateUserQuiz,
  deleteUserQuiz, */
};
