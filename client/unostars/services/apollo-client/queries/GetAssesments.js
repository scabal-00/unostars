import { gql } from "@apollo/client";

const GetAssesments = gql`
  query {
    quizzes {
      id
      title
      dsc
      isActive
      photo
      createdAt
    }
  }
`;

export default GetAssesments;
