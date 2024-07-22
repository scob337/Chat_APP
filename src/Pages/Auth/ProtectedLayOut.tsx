import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayOut = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/qr-code" replace={true} />;
};

export default ProtectedLayOut;
