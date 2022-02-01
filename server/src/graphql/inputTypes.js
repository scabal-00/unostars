import {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
} from "graphql";

const InputSelectedAnswers = new GraphQLInputObjectType({
  name: "InputSelectedAnswers",
  fields: () => ({
    questionId: { type: GraphQLString },
    correctAnswer: { type: new GraphQLList(GraphQLString) },
    userAnswer: { type: new GraphQLList(GraphQLString) },
    score: { type: GraphQLInt },
  }),
});

const InputCountAnswers = new GraphQLInputObjectType({
  name: "InputCountAnswers",
  description: "Stores the user's count for his answers",
  fields: () => ({
    countCorrectAnswers: { type: GraphQLInt },
    countWrongAnswers: { type: GraphQLInt },
    totalQuestions: { type: GraphQLInt },
  }),
});

const InputUserAnswers = new GraphQLInputObjectType({
  name: "InputUserAnswers",
  fields: () => ({
    selectedAnswers: { type: new GraphQLList(InputSelectedAnswers) },
    countAnswers: { type: InputCountAnswers },
    totalScore: { type: GraphQLInt },
  }),
});

const InputSelectedTopicsQuiz = new GraphQLInputObjectType({
  name: "InputSelectedTopicsQuiz",
  description: "Store the list of selected topics and questions from the quiz",
  fields: () => ({
    topicId: {
      type: GraphQLString,
    },
    selectedQuestionsId: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

/* const InputSelectedTopicsQuiz = new GraphQLInputObjectType({
  name: "InputSelectedTopicsQuiz",
  description: "Store the list of selected topics and questions from the quiz",
  fields: () => ({
    selectedTopics: { type: new GraphQLList(InputSelectedTopicQuiz) },
  }),
}); */

const InputUserType = new GraphQLInputObjectType({
  name: "InputUser",
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
    // level: { type: UserLevelType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const InputPrivateQuestion = new GraphQLInputObjectType({
  name: "InputPrivateQuestion",
  description:
    "Define if the question is prDefine if the question is private and who can see it if soivate and who can see",
  fields: () => ({
    isPrivate: { type: GraphQLBoolean },
    users: { type: new GraphQLList(InputUserType) },
  }),
});

const InputQuestionOptions = new GraphQLInputObjectType({
  name: "InputQuestionOptions",
  description: "Describe toption(s) of the question",
  fields: () => ({
    id: { type: GraphQLID },
    dsc: { type: GraphQLString },
    isAnswer: { type: GraphQLBoolean },
  }),
});

const InputQuestionDef = new GraphQLInputObjectType({
  name: "InputQuestionDef",
  description:
    "Describe the type of question (Multiple selection, One Selection, etc) and the posible questions (options)",
  fields: () => ({
    name: { type: GraphQLString },
    dsc: { type: GraphQLString },
    options: { type: new GraphQLList(InputQuestionOptions) },
  }),
});

module.exports = {
  InputPrivateQuestion,
  InputQuestionDef,
  InputSelectedTopicsQuiz,
  InputUserAnswers,
};
