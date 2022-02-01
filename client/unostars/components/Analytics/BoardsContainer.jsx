import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

function BoardContainer(props) {
  return (
    <Box sx={{ flexGrow: 2 }} style={{ marginTop: "5%" }}>
      <Container>
        <Grid container size={12} spacing={2}>
          {props.children}
        </Grid>
      </Container>
    </Box>
  );
}

export default BoardContainer;
