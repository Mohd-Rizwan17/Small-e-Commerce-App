import { Link } from "react-router-dom";
import { FALLBACK_IMAGE } from "../utils/constants";

const getStockStatus = (stock) => {
  if (stock === 0)
    return { label: "Out of stock", className: "bg-red-100 text-red-700" };
  if (stock <= 5)
    return {
      label: `Only ${stock} left`,
      className: "bg-amber-100 text-amber-700",
    };
  return { label: "In stock", className: "bg-green-100 text-green-700" };
};

const ProductCard = ({ product, style }) => {
  const stockStatus = getStockStatus(product.stock);

  return (
    <Link
      to={`/products/${product._id}`}
      style={style}
      className="animate-rise-in group block overflow-hidden rounded-xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-4/3 overflow-hidden bg-ink/5">
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display font-semibold text-ink">
            {product.name}
          </h2>
          <span className="whitespace-nowrap font-display font-semibold text-accent">
            ₹{product.price}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink-muted">
          by {product.createdBy?.name || "Unknown"}
        </p>
        <span
          className={`mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${stockStatus.className}`}
        >
          {stockStatus.label}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
