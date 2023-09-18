import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../../Pages/LandingPage";
import TestPage from "../../Pages/TestPage";
import FinishPage from "../../Pages/FinishPage";
import ErrorPage from "../../Pages/ErrorPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} exact />
      <Route path="/test" element={<TestPage />} exact />
      <Route path="/finish" element={<FinishPage />} exact />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
