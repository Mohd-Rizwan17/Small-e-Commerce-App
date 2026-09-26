import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "products/:id", element: <ProductDetails /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "products/add", element: <AddProduct /> },
          { path: "products/:id/edit", element: <EditProduct /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
