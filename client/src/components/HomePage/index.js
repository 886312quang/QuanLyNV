import React from "react";
import Layout from "../Layout/index";
import { Redirect } from "react-router-dom";

const HomePage = () => {
  return <Redirect to="/shift" />;
};

export default Layout(HomePage);
