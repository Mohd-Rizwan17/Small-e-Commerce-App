import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.product);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;

    setIsDeleting(true);
    try {
      await api.delete(`/products/${id}`);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete product");
      setIsDeleting(false);
    }
  };

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
        {error}
      </p>
    );
  }

  if (!product) {
    return <p className="text-ink-muted">Loading...</p>;
  }

  const isOwner = user && product.createdBy?._id === user.id;
  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="mx-auto max-w-3xl">
      <Link to="/" className="text-sm text-ink-muted hover:text-accent">
        ← Back to products
      </Link>

      <div className="mt-4 grid gap-8 sm:grid-cols-2">
        <div className="aspect-4/3 overflow-hidden rounded-xl bg-ink/5">
          <img
            src={product.image || FALLBACK_IMAGE}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">
            {product.name}
          </h1>
          <p className="mt-1 font-display text-2xl font-semibold text-accent">
            ₹{product.price}
          </p>

          <span
            className={`mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${stockStatus.className}`}
          >
            {stockStatus.label}
          </span>

          <p className="mt-4 text-sm text-ink-muted">
            Listed by {product.createdBy?.name || "Unknown"}
          </p>

          {product.description && (
            <p className="mt-4 text-ink">{product.description}</p>
          )}

          {isOwner && (
            <div className="mt-6 flex gap-3">
              <Link
                to={`/products/${product._id}/edit`}
                className="rounded-lg border border-ink/15 px-4 py-2 text-sm font-medium hover:bg-ink/5"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
