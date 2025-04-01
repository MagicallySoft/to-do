import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ToDoList from "../pages/ToDoList";
import Header from "../componets/Header/Header";

const Routers = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/to-do" element={<ToDoList />}></Route>
      </Routes>
    </div>
  );
};

export default Routers;
