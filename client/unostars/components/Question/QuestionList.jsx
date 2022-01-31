import { Fragment, useState, useEffect } from "react";

import { useUser } from "@auth0/nextjs-auth0";
import { useMutation } from "@apollo/client";
import SwipeableViews from "react-swipeable-views";
import { Paper, Grid, Typography, Fab, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import Question from "./Question";
import { ConfirmationAlert } from "../";
import { CreateUserQuiz } from "../../services/apollo-client/mutations";

const QuestionList = (props) => {
  const { questions } = props;
  const numberOfQuestions = questions.length;
  const answersStateInit = Array(numberOfQuestions).fill(null);

  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    if (answers.length === 0 && questions.length > 0) {
      setAnswers(answersStateInit);
    }
  }, [questions]);

  // console.log(props);

  const { user, error, isLoading } = useUser();

  const [createUserQuiz, createUserQuizResult] = useMutation(CreateUserQuiz);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSelectAnswer = (selectedAnswer, questionId, questionIndex) => {
    const newAnswersArray = [...answers];
    newAnswersArray[questionIndex] = {
      questionId,
      userAnswer: [selectedAnswer],
    };
    setAnswers(newAnswersArray);
    if (activeStep === numberOfQuestions - 1) {
      const numberOfAnsweredAnswers = getNumberOfAnsweredAnswers();
      if (numberOfAnsweredAnswers < numberOfQuestions) {
        setDialog(true);
      } else {
        handleFinishQuizz();
      }
      alert("Finished!");
      return;
    }
    handleChangeProgress();
    handleNext();
  };

  const handleChangeProgress = () => {
    const numberOfAnsweredAnswers = getNumberOfAnsweredAnswers();

    const currentProgress =
      ((numberOfAnsweredAnswers + 1) * 100) / numberOfQuestions;
    if (currentProgress > 100) {
      setProgress(100);
    } else {
      setProgress(currentProgress);
    }
  };

  const getNumberOfAnsweredAnswers = () => {
    let count = 0;
    answers.forEach((answer) => {
      if (answer !== null) {
        ++count;
      }
    });
    return count;
  };

  const handleFinishQuizz = () => {
    setDialog(false);
    const answersArray = [...answers];
    const filteredAnswers = answersArray.filter((answer) => answer !== null);
    setAnswers(filteredAnswers);

    createUserQuiz({
      variables: {
        userId: user?.id || "61ee93955e8cb303ebaf0db3",
        quizId: props.quizId,
        userAnswers: { selectedAnswers: filteredAnswers },
      },
    });
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
          height: "100vh",
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
            onSelectAnswer={handleSelectAnswer}
            index={index}
            selectedAnswers={answers}
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
      <ConfirmationAlert
        title="Your Assessment"
        description="You have some unanswered questions, are sure you want to finish the assessment?"
        open={dialog}
        handleClose={() => setDialog(false)}
        onAccept={handleFinishQuizz}
      />
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
