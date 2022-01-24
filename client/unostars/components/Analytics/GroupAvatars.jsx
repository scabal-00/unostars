import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { deepOrange, deepPurple, indigo } from "@mui/material/colors";

function GroupAvatars() {
  return (
    <AvatarGroup max={4}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>AS</Avatar>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>AT</Avatar>
      <Avatar sx={{ bgcolor: indigo[500] }}>C</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>SC</Avatar>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
    </AvatarGroup>
  );
}

export default GroupAvatars;
