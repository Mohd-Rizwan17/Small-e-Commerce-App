import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { restoreSession } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const isInitialised = useSelector((state) => state.auth.isInitialised);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  if (!isInitialised) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return <AppRoutes />;
};

export default App;
