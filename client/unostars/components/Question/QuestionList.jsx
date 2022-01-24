import { Fragment, useState } from "react";

import { Paper, Grid, Typography, Fab, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Question from "./Question";

const QuestionList = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(10);
  return (
    <Fragment>
      <TimeContainer>
        <span>
          <AccessTimeIcon color="primary" sx={{ marginRight: ".5rem" }} />
          <Typography color="primary">11:45</Typography>
        </span>
      </TimeContainer>
      <Question />
      <StepperContainer elevation={0}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ marginBottom: ".5rem" }}
        />
        <Grid container spacing={1} justifyContent="end">
          <Grid item>
            <Fab size="small" color="primary">
              <KeyboardArrowLeft />
            </Fab>
          </Grid>
          <Grid item sx={{ marginRight: ".5rem" }}>
            <Fab size="small" color="primary">
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
  span {
    display: flex;
  }
`;
