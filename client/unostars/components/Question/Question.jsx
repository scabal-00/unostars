import { Paper, Grid, Typography, Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const Question = (props) => {
  console.log("Question props", props);
  return (
    <Container>
      <QuestionContainer>
        <StepIndicator
          color="primary"
          label={`Question ${props.activeQuestionNumber} of ${props.numberOfQuestions}`}
        />
        <Typography>{props.question.questionType.dsc}</Typography>
      </QuestionContainer>
      <Grid container spacing={1}>
        {props?.question?.questionType?.options?.map((option, index) => (
          <Grid item xs={12} md={6} key={option.id}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={
                <AnswerIndicator
                  size="small"
                  label={`${index + 1}.`}
                  color="primary"
                />
              }
              sx={{ justifyContent: "flex-start", textTransform: "initial" }}
            >
              {option?.dsc}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Question;

const Container = styled("div")`
  padding: 1rem;
  height: 100vh;
`;

const QuestionContainer = styled(Paper)`
  padding: 1rem;
  padding-top: 1.5rem;
  position: relative;
  margin-bottom: 2rem;
  margin-top: 3rem;
`;

const StepIndicator = styled(Chip)`
  position: absolute;
  top: -1rem;
  left: 0;
`;

const AnswerIndicator = styled(Chip)`
  border-radius: 5px;
  font-size: 1rem !important;
  text-transform: uppercase;
`;
