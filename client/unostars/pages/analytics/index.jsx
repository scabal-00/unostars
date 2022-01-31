import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import BoardContainer from "../../components/Analytics/BoardsContainer";
import BoardItem from "../../components/Analytics/BoardItem";
import LinealChart from "../../components/Analytics/LinealChart";
import StackOfUsers from "../../components/Analytics/StackOfUsers";
import ProgressItem from "../../components/Analytics/ProgressItem";

const users = [
  { name: "Alan Torres", technology: "JavaScript", points: "93" },
  { name: "Alejandra Sanchez", technology: "JavaScript", points: "93" },
  { name: "Samuel Cabal", technology: "JavaScript", points: "93" },
  { name: "Camilo Kosnoioski", technology: "JavaScript", points: "93" },
];

const items = [
  {
    title: "Assesments completed",
    description: "Checkout all the completed asssesments",
    percentage: 84,
  },
  {
    title: "Outside Users",
    description: "Outside user with progress",
    percentage: 16,
  },
  {
    title: "Assesments Assign",
    description: "Checkout the assign asssesments",
    percentage: 56,
  },
];

function Analytics() {
  return (
    <>
      <NavBar />
      <BoardContainer>
        <BoardItem size={4}>
          <ProgressItem items={items} />
        </BoardItem>
        <BoardItem size={8}>
          <LinealChart />
          <StackOfUsers users={users} />
        </BoardItem>
      </BoardContainer>
    </>
  );
}

export default Analytics;
