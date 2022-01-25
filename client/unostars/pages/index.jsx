import { Fragment, useEffect, useState } from "react";

import { Container, Paper, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { useUser } from "@auth0/nextjs-auth0";
import { useLazyQuery } from "@apollo/client";
import { client } from "../services/apollo-client";

import { Navbar, QuizzList } from "../components";
import { GetAssesments } from "../services/apollo-client/queries";

export default function Home(props) {
  // const { user } = useUser();
  // {
  //   !user && (
  //     <>
  //       <button>
  //         <Link href="/api/auth/login">
  //           <a>Login</a>
  //         </Link>
  //       </button>
  //     </>
  //   );
  // }
  // {
  //   user && (
  //     <>
  //       <img src={user.picture} alt={user.name} />
  //       <h2> Welcome {user.name}</h2>

  //       <button>
  //         <Link href="/api/auth/logout">
  //           <a>Logout</a>
  //         </Link>
  //       </button>
  //     </>
  //   );
  // }

  const [assesments, setAssesments] = useState(props.availableAssesments);

  const [getAssesments, getAssesmentsResult] = useLazyQuery(GetAssesments);

  useEffect(() => {
    handleGetAssesments();
  }, []);

  useEffect(() => {
    if (
      getAssesmentsResult.called &&
      !getAssesmentsResult.loading &&
      getAssesmentsResult.data
    ) {
      setAssesments(getAssesmentsResult.data.quizzes);
    }
  }, [getAssesmentsResult]);

  const handleGetAssesments = () => {
    if (!assesments) {
      getAssesments();
    }
  };

  return (
    <Fragment>
      <Background elevation={0}>
        <Navbar />
        <Container maxWidth="xl" sx={{ marginTop: "1.5rem" }}>
          {/* <Grid container>
            <Grid item xs={12} sx={{ marginTop: "1rem" }}>
              <Typography>Current Assesments</Typography>
            </Grid>
            <Grid item xs={12}>
              <QuizzList />
            </Grid>
          </Grid> */}
          <Grid container>
            <Grid item xs={12} sx={{ marginTop: "1rem" }}>
              <Typography>Available Assesments</Typography>
            </Grid>
            <Grid item xs={12}>
              <QuizzList quizzList={assesments} />
            </Grid>
          </Grid>
        </Container>
      </Background>
    </Fragment>
  );
}

const Background = styled(Paper)`
  border-radius: 0;
  min-height: 100vh;
`;

export async function getServerSideProps() {
  const { data } = await client.query({ query: GetAssesments });
  return {
    props: {
      availableAssesments: data.quizzes,
    },
  };
}
