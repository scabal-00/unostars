import { gql } from "@apollo/client";

const CreateUserQuiz = gql`
  mutation createUserQuiz(
    $userId: String!
    $quizId: String!
    $userAnswers: InputUserAnswers!
  ) {
    createUserQuiz(
      userId: $userId
      quizId: $quizId
      userAnswers: $userAnswers
    ) {
      id
      userId {
        userId
      }
      quiz {
        id
        title
      }
      userAnswers {
        totalScore
      }
    }
  }
`;

export default CreateUserQuiz;
