import { useEffect, useMemo, useState } from "react";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Error404 from "./components/Dashboard/Error/Error404";
import Login from "./components/Login/Login";
import { createContext } from "react";
export const UserContext = createContext(null);

const Router = () => {
  const [value, setValue] = useState({});
  const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  return (
    <BrowserRouter>
      <UserContext.Provider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
