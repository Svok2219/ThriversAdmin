import { Navigate } from "react-router-dom";
import { useContext } from "react";
const Protected = ({ children }) => {
  if (!localStorage.getItem("admin-token")) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default Protected;
