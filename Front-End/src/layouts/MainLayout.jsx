import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    <Outlet />
  </div>
);

export default MainLayout;
