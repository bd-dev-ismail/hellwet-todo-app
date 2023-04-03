import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import DisplayTodos from "../Components/Todos/DisplayTodos/DisplayTodos";

const Main = () => {
  return (
    <div>
      <Navbar />
     
      <Outlet />
    </div>
  );
};

export default Main;
