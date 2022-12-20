import React from "react";
import { Routes, Route } from "react-router-dom";
import AddPartners from "./Add Partners/AddPartners";
import AddRecognizers from "./Add Recognizers/AddRecognizers";
import AllPartners from "./All Brands/AllPartners";
import AllRecognizers from "./All Brands/AllRecognizers";
import EditPartners from "./Edit Brands/EditPartners";
import EditRecognizers from "./Edit Brands/EditRecognizers";
// import BrandsDetails from "./All Brands/AllBrands";
// import AllBrands from "./All Brands/AllBrands";
// import EditBrands from "./Edit Brands/EditBrands";
// import BrandsDetails from "./Brands Details/BrandsDetails";
const Brands = () => {
  return (
    <Routes>
      <Route path="/add-Partners" element={<AddPartners />} />
      <Route path="/add-Recognizers" element={<AddRecognizers />} />
      <Route path="/all-Partners" element={<AllPartners />} />
      <Route path="/update-Partners/:id" element={<EditPartners />}></Route>
      <Route path="/all-Recognizers" element={<AllRecognizers />} />

      <Route
        path="/update-Recognizers/:id"
        element={<EditRecognizers />}
      ></Route>
    </Routes>
  );
};

export default Brands;
