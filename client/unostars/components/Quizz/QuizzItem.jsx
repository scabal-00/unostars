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
      <CardActionArea onClick={goToQuizz.bind(null, props?.quizzId)}>
        <CardMedia component="img" height="140" image={props?.photo} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props?.dsc}
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
