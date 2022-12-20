import React from "react";
import { Routes, Route } from "react-router-dom";
import AddMentorship from "./AddMentorship/AddMentorship";
import AllApplication from "./All Application/AllApplications";
import AllMentorship from "./All Mentorship/AllMentorship";
import EditMentorship from "./Edit Mentorship/EditMentorship";
const Mentorship = () => {
  return (
    <Routes>
      <Route path="/add-Mentorship" element={<AddMentorship />}></Route>
      <Route path="/all-Applications" element={<AllApplication />} />
      <Route path="/all-Mentorship" element={<AllMentorship />}></Route>
      <Route path="/update-Mentorship/:id" element={<EditMentorship />}></Route>
    </Routes>
  );
};

export default Mentorship;
