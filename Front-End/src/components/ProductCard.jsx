import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
  <Link
    to={`/products/${product._id}`}
    className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
  >
    <div className="flex items-start justify-between gap-2">
      <h2 className="font-semibold text-gray-900">{product.name}</h2>
      <span className="whitespace-nowrap font-semibold text-indigo-600">
        ₹{product.price}
      </span>
    </div>
    <p className="mt-1 text-sm text-gray-500">
      {product.stock} in stock · by {product.createdBy?.name || "Unknown"}
    </p>
  </Link>
);

export default ProductCard;
