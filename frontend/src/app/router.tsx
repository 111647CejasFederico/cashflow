import { createBrowserRouter } from "react-router";

import MainLayout from "../components/LayoutsComponents/MainLayout";
import ProtectedRoute from "../components/UXComponents/ProtextedRoute";
import Error500 from "../pages/errors/Error505";
import NotFound404 from "../pages/errors/NotFound404";
import Unauthorized401 from "../pages/errors/Unauthorized401";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Master from "../pages/Master";

export const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/401", element: <Unauthorized401 /> },
  { path: "/500", element: <Error500 /> },

  // privado
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/masters", element: <Master /> },
        ],
      },
    ],
  },

  // 404
  { path: "*", element: <NotFound404 /> },
]);
