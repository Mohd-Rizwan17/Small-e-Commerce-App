import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold">Page not found</h1>
    <Link to="/" className="text-blue-600 underline">
      Go back home
    </Link>
  </div>
);

export default NotFound;
