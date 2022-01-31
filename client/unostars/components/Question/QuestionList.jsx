import { Fragment, useState } from "react";

import SwipeableViews from "react-swipeable-views";
import { Paper, Grid, Typography, Fab, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Question from "./Question";

const QuestionList = (props) => {
  const numberOfQuestions = props.questions.length;

  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(10);

  console.log(props);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Fragment>
      <TimeContainer>
        <span>
          <AccessTimeIcon color="primary" sx={{ marginRight: ".5rem" }} />
          <Typography color="primary">11:45</Typography>
        </span>
      </TimeContainer>
      <SwipeableViews
        containerStyle={{
          height: "calc(100vh)",
        }}
        axis="y"
        resistance
        index={activeStep}
      >
        {props?.questions?.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            activeQuestionNumber={index + 1}
            numberOfQuestions={numberOfQuestions}
          />
        ))}
      </SwipeableViews>
      <StepperContainer elevation={0}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ marginBottom: ".5rem" }}
        />
        <Grid container spacing={1} justifyContent="end">
          <Grid item>
            <Fab
              size="small"
              color="primary"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
            </Fab>
          </Grid>
          <Grid item sx={{ marginRight: ".5rem" }}>
            <Fab
              size="small"
              color="primary"
              onClick={handleNext}
              disabled={activeStep === numberOfQuestions - 1}
            >
              <KeyboardArrowRight />
            </Fab>
          </Grid>
        </Grid>
      </StepperContainer>
    </Fragment>
  );
};

export default QuestionList;

const StepperContainer = styled(Paper)`
  border-radius: 0;
  position: fixed;
  bottom: 0;
  min-width: 100%;
  max-width: 100vw;
  padding-bottom: 0.5rem;
`;

const TimeContainer = styled("div")`
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  span {
    display: flex;
  }
`;
