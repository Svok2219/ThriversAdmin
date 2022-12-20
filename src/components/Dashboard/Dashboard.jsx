import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import BlogandEvent from "./BlogandEvent/BlogandEvent";
import InternShip from "./InternShip/InternShip";
import Mentorship from "./Mentorship/Mentorship";
import TeamQ from "./TeamQ/TeamQ";
import Brands from "./Brands/Brands";

import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Protected from "../ProtectedRoute";

const Dashboard = () => {
  return (
    <>
      {" "}
      <Navbar />
      <Sidebar />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/Mentorship/*"
          element={
            <Protected>
              <Mentorship />
            </Protected>
          }
        />
        <Route
          path="/InternShip/*"
          element={
            <Protected>
              <InternShip />
            </Protected>
          }
        />
        <Route
          path="/Blog&Event/*"
          element={
            <Protected>
              <BlogandEvent />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/TeamQ/*"
          element={
            <Protected>
              <TeamQ />
            </Protected>
          }
        />
        <Route
          path="/Brands/*"
          element={
            <Protected>
              <Brands />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default Dashboard;
