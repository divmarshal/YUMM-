import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";
import Filter from "../components/filters/Filter";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Filter />
      <Outlet />
    </>
  );
};

export default RootLayout;
