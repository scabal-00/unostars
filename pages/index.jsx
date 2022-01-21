import { Fragment } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Paper, Grid } from "@mui/material";

// import Head from "next/head";
// import { Container, Paper, Grid, Typography } from "@mui/material";
// import { styled } from "@mui/material/styles";

// import { Navbar, QuizzList } from "../components";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return (
    <Fragment>
      <Paper
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-60% ,-60%)",
        }}
      >
        <h1>Welcome to Unostars</h1>

        {user && (
          <>
            <img src={user.picture} alt={user.name} />
            <h2> Welcome {user.name}</h2>

            <Stack spacing={2} direction="row">
              <Button variant="contained">
                <Link href="/api/auth/logout">
                  <a>Logout</a>
                </Link>
              </Button>
            </Stack>
          </>
        )}

        <Button variant="contained">
          <Link href="/dashboard">
            <a>login</a>
          </Link>
        </Button>
      </Paper>
    </Fragment>
  );
}
