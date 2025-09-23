import { Navigate, Outlet, useLocation } from "react-router";

// Si ya tenés AuthContext, usalo aquí. Fallback: token en LS.
function useAuth() {
  const token = localStorage.getItem("token");
  return { isAuth: !!token };
}

export default function ProtectedRoute() {
  const { isAuth } = useAuth();
  const loc = useLocation();
  if (!isAuth) return <Navigate to="/login" replace state={{ from: loc }} />;
  return <Outlet />;
}
