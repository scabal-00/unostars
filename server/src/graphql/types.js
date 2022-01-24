import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLInputObjectType,
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
    correctAnswer: { type: GraphQLString },
    userAnswer: { type: GraphQLString },
    score: { type: GraphQLInt },
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

const InputSelectedAnswers = new GraphQLInputObjectType({
  name: "InputSelectedAnswers",
  fields: () => ({
    questionId: { type: GraphQLString },
    correctAnswer: { type: GraphQLString },
    userAnswer: { type: GraphQLString },
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

//Se necesita creat un Input para cada coleccion por "TopicType"
// const InputTopicQuestion = new GraphQLInputObjectType({
//   name: "InputTopicQuestion",
//   fields: () => ({
//     topic: { type: new GraphQLList(TopicType) },
//   }),
// });

//-----------------------

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
    userAnswers: { type: UserAnswersType },
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
    /* author: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.authorId);
      },
    }, */
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
  InputPrivateQuestion,
  InputQuestionDef,
  QuestionDefType,
  QuestionType,
  TopicType,
  GlobalTopicType,
  QuizType,
  InputSelectedTopicsQuiz,
  UserQuizType,
  InputUserAnswers,
  PostType,
  CommentType,
};
