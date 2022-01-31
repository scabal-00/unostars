import React from "react";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function BoardItem(props) {
  return (
    <Grid item xs={props.size} justifyContent="center" alignItems="center">
      <Item>{props.children}</Item>
    </Grid>
  );
}

export default BoardItem;
