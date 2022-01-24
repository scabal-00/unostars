import React from "react";

import { Stack } from "@mui/material";
import ProgressCircle from "./ProgressCircle";
import ItemText from "./ItemText";
import GroupAvatars from "./GroupAvatars";
import BoardItem from "./BoardItem";

function ProgressItem(props) {
  if (props.items.length === 0) {
    return <h6>No se encontraron registros</h6>;
  }

  return (
    <Stack direction="column" spacing={2}>
      {props.items.map((item) => (
        <BoardItem spacing={3}>
          <Stack direction="row" spacing={2}>
            <ProgressCircle
              percentage={item.percentage}
              color1={"#304ff3"}
              color2={"#0098ce"}
            />
            <Stack spacing={2} justifyContent="center" alignItems="center">
              <ItemText title={item.title} description={item.description} />
              <GroupAvatars />
            </Stack>
          </Stack>
        </BoardItem>
      ))}
    </Stack>
  );
}

export default ProgressItem;
