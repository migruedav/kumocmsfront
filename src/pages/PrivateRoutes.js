import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../store/Store";

const PrivateRoutes = () => {
  const user = useStore((state) => state.user);

  return user?.role === "authenticated" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
