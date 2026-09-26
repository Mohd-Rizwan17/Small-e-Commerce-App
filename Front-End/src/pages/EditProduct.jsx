import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";
import { parseApiErrors } from "../utils/formErrors";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [form, setForm] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        const product = data.product;

        if (product.createdBy?._id !== user.id) {
          setLoadError("You can only edit your own products");
          return;
        }

       setForm({
         name: product.name,
         image: product.image || "",
         description: product.description || "",
         price: product.price,
         stock: product.stock,
       });
      } catch (err) {
        setLoadError(err.response?.data?.message || "Could not load product");
      }
    };

    fetchProduct();
  }, [id, user.id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setFormError("");
    setIsSubmitting(true);

    try {
      await api.put(`/products/${id}`, form);
      navigate(`/products/${id}`);
    } catch (error) {
      const parsed = parseApiErrors(error.response?.data);
      setFieldErrors(parsed.fieldErrors);
      setFormError(parsed.formError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadError) {
    return (
      <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
        {loadError}
      </p>
    );
  }

  if (!form) {
    return <p className="text-gray-500">Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-semibold">Edit product</h1>
      {formError && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {formError}
        </p>
      )}
      <ProductForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        fieldErrors={fieldErrors}
        isSubmitting={isSubmitting}
        submitLabel="Save changes"
      />
    </div>
  );
};

export default EditProduct;
