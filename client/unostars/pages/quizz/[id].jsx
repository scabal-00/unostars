import { Fragment } from "react";
import { useRouter } from "next/router";

import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Navbar, QuestionList } from "../../components";

const Quizz = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(`Quizz: ${id}`);

  return (
    <Fragment>
      <Background>
        <Navbar />
        <QuestionList />
      </Background>
    </Fragment>
  );
};

export default Quizz;

const Background = styled(Paper)`
  border-radius: 0;
  min-height: 100vh;
`;