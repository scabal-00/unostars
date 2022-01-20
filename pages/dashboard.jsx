import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Fragment } from "react";

import Head from "next/head";
import { Container, Paper, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Navbar, QuizzList } from "../components";

export default function Dashboard() {
  return (
    <Fragment>
      <Head>
        <title>Unostars</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background elevation={0}>
        <Navbar />
        <Container maxWidth="xl" sx={{ marginTop: "1.5rem" }}>
          <Grid container>
            <Grid item xs={12} sx={{ marginTop: "1rem" }}>
              <Typography>Current Assesments</Typography>
            </Grid>
            <Grid item xs={12}>
              <QuizzList />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sx={{ marginTop: "1rem" }}>
              <Typography>Available Assesments</Typography>
            </Grid>
            <Grid item xs={12}>
              <QuizzList />
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

export const getServerSideProps = withPageAuthRequired();