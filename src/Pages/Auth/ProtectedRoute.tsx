import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // const token = localStorage.getItem("token");
  // if (token) {
  //   window.history.back();
  // }

  return <Outlet />;  
};
export default ProtectedRoute;
