import { useRouter } from "next/router";

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const QuizzItem = (props) => {
  const router = useRouter();

  const goToQuizz = (id) => {
    router.push(`/quizz/${id}`);
  };

  return (
    <SCard>
      <CardActionArea onClick={goToQuizz.bind(null, props.quizzId)}>
        <CardMedia
          component="img"
          height="140"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            JavaScript
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Async/Await course advanced level.
          </Typography>
        </CardContent>
      </CardActionArea>
    </SCard>
  );
};

export default QuizzItem;

const SCard = styled(Card)`
  flex-shrink: 0;
  margin-right: 1rem;
  max-width: 300px;
  :last-child {
    margin-right: 0;
  }
`;
