import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="font-display text-lg font-semibold text-ink">
          Small E-Commerce
        </Link>

        <div className="flex items-center gap-2 text-sm sm:gap-4">
          {user ? (
            <>
              <Link
                to="/products/add"
                className="font-medium text-ink-muted hover:text-accent"
              >
                Add Product
              </Link>
              <span className="hidden text-ink-muted sm:inline">
                Hi, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-ink/15 px-3 py-1.5 font-medium hover:bg-ink/5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-ink-muted hover:text-accent"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-accent px-3 py-1.5 font-medium text-white hover:brightness-110"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
