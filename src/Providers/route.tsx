import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../Components/Home-page/HomePage";
import { Login } from "../Components/Login-page/Login";
import App from "../App";
import { ProtectedRoute } from "../Components/Protected-route/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export const AppRouterProvider = () => {
  return <RouterProvider router={router} />;
};
