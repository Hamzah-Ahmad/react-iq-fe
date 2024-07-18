import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const {auth} = useAuth();
  const location = useLocation();
    // return allowedRoles?.includes(auth?.user?.role) 
  return auth?.accessToken ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
