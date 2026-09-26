import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => (
  <div className="min-h-screen bg-paper text-ink">
    <Navbar />
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
