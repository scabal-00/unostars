import React from "react";
import NavBar from "../../components/Navbar";
import BoardItem from "../../components/Analytics/BoardItem";
import BoardContainer from "../../components/Analytics/BoardsContainer";
import { Typography, Grid } from "@mui/material";

function Catalog() {
  return (
    <>
      <NavBar />

      <Typography variant="h3">Technologies</Typography>
      <BoardContainer>
        <BoardItem size={4}>
          <Typography variant="h4">Javascript</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">React JS</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">Next JS</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">C#</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">JAVA</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">.NET</Typography>
        </BoardItem>
      </BoardContainer>
      <Typography variant="h3">Topics</Typography>
      <BoardContainer>
        <BoardItem size={4}>
          <Typography variant="h4">Javascript</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">React JS</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">Next JS</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">C#</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">JAVA</Typography>
        </BoardItem>
        <BoardItem size={4}>
          <Typography variant="h4">.NET</Typography>
        </BoardItem>
      </BoardContainer>
    </>
  );
}

export default Catalog;
