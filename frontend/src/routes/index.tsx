import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Home";
import UserDetails from "./UserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <UserDetails />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
