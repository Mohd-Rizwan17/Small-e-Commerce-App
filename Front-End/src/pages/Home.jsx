import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";

const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-xl border border-ink/10 bg-white">
    <div className="aspect-4/3 bg-ink/10" />
    <div className="space-y-2 p-4">
      <div className="h-4 w-2/3 rounded bg-ink/10" />
      <div className="h-3 w-1/3 rounded bg-ink/10" />
    </div>
  </div>
);

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError("");
      try {
        const { data } = await api.get("/products", {
          params: { page, limit: 9 },
        });
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const goToPage = (newPage) => setSearchParams({ page: newPage });

  return (
    <div>
      <section className="mb-8 flex flex-col gap-4 border-b border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Everyday gear, sold by people who use it.
          </h1>
          <p className="mt-2 max-w-md text-ink-muted">
            Browse products listed by the community — from desk setups to daily
            carry.
          </p>
        </div>
        {pagination && (
          <p className="text-sm text-ink-muted">
            {pagination.total} product{pagination.total === 1 ? "" : "s"}{" "}
            available
          </p>
        )}
      </section>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-ink-muted">
          No products yet. Be the first to add one.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                style={{ animationDelay: `${index * 60}ms` }}
              />
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3 text-sm">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className="rounded-lg border border-ink/15 px-3 py-1.5 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-ink-muted">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= pagination.totalPages}
                className="rounded-lg border border-ink/15 px-3 py-1.5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
