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
  QuestionType,
  TopicType,
  GlobalTopicType,
  QuizType,
  UserQuizType,
} from "./types";
import {
  InputPrivateQuestion,
  InputQuestionDef,
  InputSelectedTopicsQuiz,
  InputUserAnswers,
} from "./inputTypes";

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
    const { userId, name, email, age, gender, photo, role, UserLevelType } =
      args;

    const user = new User({
      userId,
      name,
      email,
      age,
      gender,
      photo,
      role,
      UserLevelType,
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

    // if (!user) throw new Error("Invalid Credentials");

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
  async resolve(_, args /* { verifiedUser } */) {
    /* if (!verifiedUser) throw new Error("You must be logged in to do that");

    const userFound = await User.findById(verifiedUser._id);
    if (!userFound) throw new Error("Unauthorized"); */

    const globalTopic = new GlobalTopic({
      //   authorId: verifiedUser._id,
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
    isActive: { type: GraphQLBoolean },
  },
  async resolve(_, { id, title, dsc, isActive }, { verifiedUser }) {
    // if (!verifiedUser) throw new Error("Unauthorized");

    const globalTopicUpdated = await GlobalTopic.findOneAndUpdate(
      { _id: id /*, authorId: verifiedUser._id */ },
      { title, dsc, isActive },
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
    // console.log(verifiedUser);
    // if (!verifiedUser) throw new Error("You must be logged in to do that");

    // const userFound = await User.findById(verifiedUser._id);
    // if (!userFound) throw new Error("Unauthorized");

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
    isActive: { type: GraphQLBoolean },
  },
  async resolve(
    _,
    { id, title, dsc, gTopic, difficulty, topicScore, isActive },
    { verifiedUser }
  ) {
    // if (!verifiedUser) throw new Error("Unauthorized");

    const topicUpdated = await Topic.findOneAndUpdate(
      { _id: id /*, authorId: verifiedUser._id */ },
      { title, dsc, gTopic, difficulty, topicScore, isActive },
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
    privateQuestion: { type: InputPrivateQuestion },
    questionType: { type: InputQuestionDef },
  },
  async resolve(_, args, { verifiedUser }) {
    // console.log(verifiedUser);
    // if (!verifiedUser) throw new Error("You must be logged in to do that");

    // const userFound = await User.findById(verifiedUser._id);
    // if (!userFound) throw new Error("Unauthorized");

    const question = new Question({
      title: args.title,
      dsc: args.dsc,
      topic: args.topic,
      privateQuestion: args.private,
      questionType: args.questionType,
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
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    topic: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    questionScore: { type: GraphQLInt },
    privateQuestion: { type: InputPrivateQuestion },
    questionType: { type: InputQuestionDef },
  },
  async resolve(
    _,
    {
      id,
      title,
      dsc,
      topic,
      difficulty,
      questionScore,
      privateQuestion,
      questionType,
    },
    { verifiedUser }
  ) {
    // if (!verifiedUser) throw new Error("Unauthorized");

    const questionUpdated = await Question.findOneAndUpdate(
      { _id: id /*, authorId: verifiedUser._id */ },
      {
        title,
        dsc,
        topic,
        difficulty,
        questionScore,
        privateQuestion,
        questionType,
      },
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
    selectedTopics: { type: new GraphQLList(InputSelectedTopicsQuiz) },
  },
  async resolve(_, args, { verifiedUser }) {
    // console.log(verifiedUser);
    // if (!verifiedUser) throw new Error("You must be logged in to do that");

    // const userFound = await User.findById(verifiedUser._id);
    // if (!userFound) throw new Error("Unauthorized");

    const quiz = new Quiz({
      title: args.title,
      dsc: args.dsc,
      photo: args.photo,
      gTopic: args.gTopic,
      selectedTopics: args.selectedTopics,
    });

    return quiz.save();
  },
};

const updateQuiz = {
  type: QuizType,
  description: "update a quiz",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    dsc: { type: GraphQLString },
    photo: { type: GraphQLString },
    gTopic: { type: GraphQLString },
    selectedTopics: { type: new GraphQLList(InputSelectedTopicsQuiz) },
  },
  async resolve(
    _,
    { id, title, dsc, photo, gTopic, selectedTopics },
    { verifiedUser }
  ) {
    // if (!verifiedUser) throw new Error("Unauthorized");

    const quizUpdated = await Quiz.findOneAndUpdate(
      { _id: id /* , authorId: verifiedUser._id */ },
      { title, dsc, photo, gTopic, selectedTopics },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!quizUpdated) throw new Error("No quiz for given id");

    return quizUpdated;
  },
};

const deleteQuiz = {
  type: GraphQLString,
  description: "delete a Quiz",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, { id }, { verifiedUser }) {
    // if (!verifiedUser) throw new Error("Unauthorized");

    const quizDelete = await Quiz.findOneAndDelete({
      _id: id,
      //   userId: verifiedUser._id,
    });

    if (!quizDelete) throw new Error("No quiz with the given ID for the user");

    return "Quiz deleted";
  },
};

const createUserQuiz = {
  type: UserQuizType,
  description: "Create a new user-quiz",
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    quizId: { type: GraphQLString },
    userAnswers: { type: InputUserAnswers },
  },
  resolve(_, args, { verifiedUser }) {
    const userQuiz = new UserQuiz({
      userId: args.userId,
      quizId: args.quizId,
      userAnswers: args.userAnswers,
    });
    return userQuiz.save();
  },
};

const updateUserQuiz = {
  type: UserQuizType,
  description: "update a user-quiz",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    quizId: { type: new GraphQLNonNull(GraphQLString) },
    userAnswers: { type: InputUserAnswers },
  },
  async resolve(_, { id, userId, quizId, userAnswers }, { verifiedUser }) {
    // if (!verifiedUser) throw new Error("UnAuthorized");

    const userQuizUpdated = await UserQuiz.findOneAndUpdate(
      {
        _id: id,
        // userId: verifiedUser._id,
      },
      {
        userId,
        quizId,
        $set: userAnswers,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!userQuizUpdated) throw new Error("No comment with the given ID");

    return userQuizUpdated;
  },
};

const deleteUserQuiz = {
  type: GraphQLString,
  description: "delete a UserQuiz",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  async resolve(_, { id }, { verifiedUser }) {
    // if (!verifiedUser) throw new Error("Unauthorized");

    const userQuizDelete = await UserQuiz.findOneAndDelete({
      _id: id,
      //   userId: verifiedUser._id,
    });

    if (!userQuizDelete)
      throw new Error("No userquiz with the given ID for the user");

    return "UserQuiz deleted";
  },
};

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
  updateQuiz,
  deleteQuiz,
  createUserQuiz,
  updateUserQuiz,
  deleteUserQuiz,
};
