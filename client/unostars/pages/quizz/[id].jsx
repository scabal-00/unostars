import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Navbar, QuestionList } from "../../components";

import { client } from "../../services/apollo-client";
import { GetQuizz } from "../../services/apollo-client/queries";

const Quizz = (props) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(`Quizz: ${id}`);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestionsArray();
  }, []);

  const getQuestionsArray = () => {
    const questionsArray = [];
    props?.quizz?.gTopic?.topics?.forEach((topic) => {
      topic?.questions?.forEach((question) => {
        questionsArray.push(question);
      });
    });
    setQuestions(questionsArray);
  };

  return (
    <Fragment>
      <Background>
        <Navbar />
        <QuestionList questions={questions} />
      </Background>
    </Fragment>
  );
};

export default Quizz;

const Background = styled(Paper)`
  border-radius: 0;
  min-height: 100vh;
`;

export async function getServerSideProps(context) {
  const { data } = await client.query({
    query: GetQuizz,
    variables: { quizzId: context.params.id },
  });
  return {
    props: {
      quizz: data.quiz,
    },
  };
}
