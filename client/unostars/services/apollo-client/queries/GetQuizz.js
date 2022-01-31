import { gql } from "@apollo/client";

const GetQuizz = gql`
  query GetQuizz($quizzId: ID!) {
    quiz(id: $quizzId) {
      id
      title
      dsc
      photo
      gTopic {
        id
        title
        dsc
        topics {
          id
          title
          dsc
          difficulty
          topicScore
          estimatedTime
          questions {
            id
            title
            dsc
            questionTime
            questionType {
              name
              dsc
              options {
                id
                dsc
                isAnswer
              }
            }
          }
        }
      }
    }
  }
`;

export default GetQuizz;
