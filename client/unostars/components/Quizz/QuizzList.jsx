import { Fragment } from "react";

import { styled } from "@mui/material/styles";

import QuizzItem from "./QuizzItem";

const QuizzList = ({ quizzList }) => {
  return (
    <Fragment>
      <Row>
        {quizzList?.map((quizz) => (
          <QuizzItem key={quizz?.id} quizzId={quizz?.id} {...quizz} />
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
