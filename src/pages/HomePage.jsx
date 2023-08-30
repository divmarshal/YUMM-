import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Filter from "../components/filters/Filter";
import Category from "../components/category/Category";
import Dishes from "../components/dishes/Dishes";

const HomePage = () => {
  return (
    <>
      <Category />
      <Dishes />
    </>
  );
};

export default HomePage;
