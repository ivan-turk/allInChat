import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import ChatRoom from "../pages/ChatRoom";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { AuthProvider } from "../context/AuthContext";

const MyRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Navbar />
              <ChatRoom />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default MyRoutes;
