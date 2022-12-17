import { Navigate } from "react-router-dom";
import { Utility } from "./utility";

export const PrivateRoute = ({ children }) => {
  const token = Utility();

  if (token && !(token.length > 2)) {
    return <Navigate to={"/login"} />;
  }

  return children;
};
