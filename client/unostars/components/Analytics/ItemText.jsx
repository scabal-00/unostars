import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ItemText(props) {
  return (
    <>
      <Box>
        <Typography variant="h6" component="div" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="body2" component="div" gutterBottom>
          {props.description}
        </Typography>
      </Box>
    </>
  );
}
export default ItemText;
