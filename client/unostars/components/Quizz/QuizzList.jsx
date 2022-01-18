import { Fragment } from "react";

import { styled } from "@mui/material/styles";

import QuizzItem from "./QuizzItem";

const QuizzList = () => {
  return (
    <Fragment>
      <Row>
        {[0, 1, 2, 3, 4, 5, 6].map((quizz) => (
          <QuizzItem key={`${quizz}-${quizz}`} quizzId={quizz} />
        ))}
      </Row>
    </Fragment>
  );
};

export default QuizzList;

const Row = styled("div")`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  overflow-x: auto;
  padding: 1rem 0;
`;
