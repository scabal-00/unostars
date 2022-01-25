import { gql } from "@apollo/client";

const GetAssesments = gql`
  query {
    quizzes {
      id
      title
      dsc
      isActive
      createdAt
    }
  }
`;

export default GetAssesments;
