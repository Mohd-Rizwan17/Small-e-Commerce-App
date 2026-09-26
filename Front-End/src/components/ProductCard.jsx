import { Link } from "react-router-dom";
import { FALLBACK_IMAGE } from "../utils/constants";

const ProductCard = ({ product }) => (
  <Link
    to={`/products/${product._id}`}
    className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
  >
    <div className="aspect-4/3 overflow-hidden bg-gray-100">
      <img
        src={product.image || FALLBACK_IMAGE}
        alt={product.name}
        loading="lazy"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-semibold text-gray-900">{product.name}</h2>
        <span className="whitespace-nowrap font-semibold text-indigo-600">
          ₹{product.price}
        </span>
      </div>
      <p className="mt-1 text-sm text-gray-500">
        {product.stock} in stock · by {product.createdBy?.name || "Unknown"}
      </p>
    </div>
  </Link>
);

export default ProductCard;
