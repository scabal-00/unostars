import { Fragment } from "react";

import { styled } from "@mui/material/styles";

import QuizzItem from "./QuizzItem";

const QuizzList = () => {
  return (
    <Fragment>
      <Row>
        {[0, 0, 0, 0, 0, 0, 0].map(() => (
          <QuizzItem />
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
