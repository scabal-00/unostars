import React from "react";

import { Typography, Stack } from "@mui/material";

import LaptopIcon from "@mui/icons-material/Laptop";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import BoardItem from "./BoardItem";

function StackOfUsers(props) {
  if (props.users.length === 0) {
    return <h6>No se encontraron registros</h6>;
  }

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h5">Best Rated Users</Typography>
      {props.users.map((user) => (
        <BoardItem size={12}>
          <Typography variant="h6" component="div">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <LaptopIcon />
            {user.technology}
          </Typography>
          <Typography variant="subtitle1" component="div">
            <StarBorderPurple500Icon />
            Starpoints: {user.points}
          </Typography>
        </BoardItem>
      ))}
    </Stack>
  );
}

export default StackOfUsers;
