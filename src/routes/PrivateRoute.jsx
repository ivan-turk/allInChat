import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

//children --> navbar i chatroom komponente
export const PrivateRoute = ({ children }) => {
  const { currentUser } = UserAuth();

  if (!currentUser) {
    //ako nije trenutni user, vrati na login page!
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
