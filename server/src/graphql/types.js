import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} from "graphql";
import { User, Question, Topic, GlobalTopic, Quiz, UserQuiz } from "../models";

//-------Types Definition---------

const UserLevelType = new GraphQLObjectType({
  name: "LevelInput",
  description: "Shows the skill level of the user",
  fields: () => ({
    userLevel: { type: GraphQLString },
    professionalLevel: { type: GraphQLString },
  }),
});

const PrivateQuestionType = new GraphQLObjectType({
  name: "PrivateQuestion",
  description:
    "Define if the question is prDefine if the question is private and who can see it if soivate and who can see",
  fields: () => ({
    isPrivate: { type: GraphQLBoolean },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent) {
        return User.find({ userId: parent.userId });
      },
    },
  }),
});

const QuestionOptionsType = new GraphQLObjectType({
  name: "QuestionOptions",
  description: "Describe toption(s) of the question",
  fields: () => ({
    id: { type: GraphQLID },
    dsc: { type: GraphQLString },
    isAnswer: { type: GraphQLBoolean },
  }),
});

const QuestionDefType = new GraphQLObjectType({
  name: "QuestionDefType",
  description:
    "Describe the type of question (Multiple selection, One Selection, etc) and the posible questions (options)",
  fields: () => ({
    name: { type: GraphQLString },
    dsc: { type: GraphQLString },
    options: { type: new GraphQLList(QuestionOptionsType) },
  }),
});

const SelectedAnswersType = new GraphQLObjectType({
  name: "SelectedAnswersType",
  description: "Stores the user's answers for each topic of your quiz",
  fields: () => ({
    questionId: {
      type: QuestionType,
      resolve(parent) {
        return Question.findById(parent.questionId);
      },
    },
    correctAnswer: {
      type: new GraphQLList(GraphQLString),
      async resolve(parent) {
        const questionObj = await Question.findById(parent.questionId);
        const rightOptions = await questionObj?.questionType?.options?.filter(
          (option) => option.isAnswer === true
        );
        /* console.log(parent);
        console.log("--->"); */
        return rightOptions.map((data) => data.id);
      },
    },
    userAnswer: { type: new GraphQLList(GraphQLString) },
    score: {
      type: GraphQLInt,
      async resolve(parent) {
        const questionObj = await Question.findById(parent.questionId);
        const rightOptions = await questionObj?.questionType?.options?.filter(
          (option) => option.isAnswer === true
        );

        if (
          rightOptions.map((data) => data.id).toString() ==
          parent?.userAnswer?.toString()
        ) {
          return questionObj?.questionScore;
        } else {
          return 0;
        }
      },
    },
  }),
});

const CountAnswersType = new GraphQLObjectType({
  name: "CountAnswersType",
  description: "Stores the user's count for his answers",
  fields: () => ({
    countCorrectAnswers: { type: GraphQLInt },
    countWrongAnswers: { type: GraphQLInt },
    totalQuestions: { type: GraphQLInt },
  }),
});

const UserAnswersType = new GraphQLObjectType({
  name: "UserAnswersType",
  description: "Stores the user's answers for each topic of his quiz",
  fields: () => ({
    selectedAnswers: { type: new GraphQLList(SelectedAnswersType) },
    countAnswers: { type: CountAnswersType },
    totalScore: { type: GraphQLInt },
  }),
});

const SelectedTopicsQuizType = new GraphQLObjectType({
  name: "SelectedTopicsQuizType",
  description: "Store the list of selected topics and questions from the quiz",
  fields: () => ({
    topicId: {
      type: TopicType,
      resolve(parent) {
        return Topic.findById(parent.topicId);
      },
    },
    selectedQuestionsId: {
      type: new GraphQLList(QuestionType), //(QuestionType),
      esolve(parent) {
        return Question.find({ topicsId: parent.selectedQuestionsId });
      },
    },
  }),
});

//-------Main Definition of Types---------

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

const GlobalTopicType = new GraphQLObjectType({
  name: "GlobalTopic",
  description: "Global Topic type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    photo: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    topics: {
      type: new GraphQLList(TopicType),
      resolve(parent) {
        return Topic.find({ gTopic: parent.id });
      },
    },
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
    photo: { type: GraphQLString },
    gTopic: {
      type: GlobalTopicType,
      resolve(parent) {
        return GlobalTopic.findById(parent.gTopic);
      },
    },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parent) {
        return Question.find({ topic: parent.id });
      },
    },
    difficulty: { type: GraphQLInt },
    topicScore: { type: GraphQLInt },
    estimatedTime: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  description: "Question type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    topic: {
      type: TopicType,
      resolve(parent) {
        return Topic.findById(parent.topic);
      },
    },
    privateQuestion: { type: PrivateQuestionType },
    questionType: { type: QuestionDefType },
    difficulty: { type: GraphQLInt },
    questionScore: { type: GraphQLInt },
    questionTime: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const QuizType = new GraphQLObjectType({
  name: "Quiz",
  description: "Quiz type",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    dsc: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    photo: { type: GraphQLString },
    gTopic: {
      type: GlobalTopicType,
      resolve(parent) {
        return GlobalTopic.findById(parent.gTopic);
      },
    },
    selectedTopics: { type: new GraphQLList(SelectedTopicsQuizType) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const UserQuizType = new GraphQLObjectType({
  name: "UserQuiz",
  description: "UserQuiz type",
  fields: () => ({
    id: { type: GraphQLID },
    isActive: { type: GraphQLBoolean },
    userId: {
      type: UserType,
      resolve(parent) {
        return User.findOne({ userId: parent.userId });
      },
    },
    quiz: {
      type: QuizType,
      resolve(parent) {
        return Quiz.findById(parent.quizId);
      },
    },
    userAnswers: {
      type: UserAnswersType,
      async resolve(parent) {
        const userQuizUpdated = await UserQuiz.findOneAndUpdate(
          {
            _id: parent.id,
          },
          {
            $set: parent.userAnswers,
          }
        );
        // console.log(parent.userAnswers);
        // console.log(parent.userAnswers.score);***
        // console.log(userQuizUpdated);
        return parent.userAnswers;
      },
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

module.exports = {
  UserType,
  GlobalTopicType,
  TopicType,
  QuestionType,
  QuizType,
  UserQuizType,
};
