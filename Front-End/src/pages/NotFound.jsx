import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-ink">Page not found</h1>
    <Link to="/" className="text-accent underline">
      Go back home
    </Link>
  </div>
);

export default NotFound;
