import React from "react";
import { Routes, Route } from "react-router-dom";
import AddBlogs from "./Add BlogandEvent/AddBlogs";
import AddEvents from "./Add BlogandEvent/AddEvents";
import AllBlog from "./All BlogandEvent/AllBlog";
import AllEvents from "./All BlogandEvent/AllEvents";
import EditBlog from "./Edit BlogandEvent/EditBlog";
import EditEvents from "./Edit BlogandEvent/EditEvents";
// import AddBrand from "./Add Brand/AddBrand";
// import AllBlogandEvent from "./All BlogandEvent/AllBlogandEvent.jsx";
// import EditBlogandEvent from "./Edit BlogandEvent/EditBlogandEvent";
const BlogandEvent = () => {
  return (
    <Routes>
      <Route path="/add-Blog" element={<AddBlogs />} />
      <Route path="/add-Events" element={<AddEvents />} />
      <Route path="/all-Blogs" element={<AllBlog />} />
      <Route path="/all-Blogs" element={<AllBlog />} />
      <Route path="/all-events" element={<AllEvents />} />
      <Route path="/update-Blog/:id" element={<EditBlog />} />
      <Route path="/update-Events/:id" element={<EditEvents />} />
      {/**/}
    </Routes>
  );
};

export default BlogandEvent;
