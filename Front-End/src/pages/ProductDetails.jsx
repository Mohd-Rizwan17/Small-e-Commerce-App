import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import { FALLBACK_IMAGE } from "../utils/constants";

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
    return <p className="text-gray-500">Loading...</p>;
  }

  const isOwner = user && product.createdBy?._id === user.id;

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 aspect-16/9 overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <span className="whitespace-nowrap text-xl font-semibold text-indigo-600">
          ₹{product.price}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-500">
        Listed by {product.createdBy?.name || "Unknown"} · {product.stock} in
        stock
      </p>

      {product.description && (
        <p className="mt-4 text-gray-700">{product.description}</p>
      )}

      {isOwner && (
        <div className="mt-6 flex gap-3">
          <Link
            to={`/products/${product._id}/edit`}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
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

      <Link
        to="/"
        className="mt-6 inline-block text-sm text-indigo-600 underline"
      >
        ← Back to products
      </Link>
    </div>
  );
};

export default ProductDetails;
