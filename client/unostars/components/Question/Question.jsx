import { Paper, Grid, Typography, Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const Question = () => {
  return (
    <Container>
      <QuestionContainer>
        <StepIndicator color="primary" label="Question 1 of 10" />
        <Typography>
          Which of the following number object function returns the value of the
          number?
        </Typography>
      </QuestionContainer>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={
              <AnswerIndicator size="small" label="a" color="primary" />
            }
            sx={{ justifyContent: "flex-start", textTransform: "initial" }}
          >
            toString()
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={
              <AnswerIndicator size="small" label="b" color="primary" />
            }
            sx={{ justifyContent: "flex-start", textTransform: "initial" }}
          >
            valueOf()
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={
              <AnswerIndicator size="small" label="c" color="primary" />
            }
            sx={{ justifyContent: "flex-start", textTransform: "initial" }}
          >
            toLocaleString()
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={
              <AnswerIndicator size="small" label="d" color="primary" />
            }
            sx={{ justifyContent: "flex-start", textTransform: "initial" }}
          >
            toPrecision()
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Question;

const Container = styled("div")`
  padding: 1rem;
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
