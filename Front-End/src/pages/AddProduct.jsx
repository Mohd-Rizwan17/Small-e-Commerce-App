import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ProductForm from "../components/ProductForm";
import { parseApiErrors } from "../utils/formErrors";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    stock: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setFormError("");
    setIsSubmitting(true);

    try {
      const { data } = await api.post("/products", form);
      navigate(`/products/${data.product._id}`);
    } catch (error) {
      const parsed = parseApiErrors(error.response?.data);
      setFieldErrors(parsed.fieldErrors);
      setFormError(parsed.formError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-semibold">Add product</h1>
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
        submitLabel="Create product"
      />
    </div>
  );
};

export default AddProduct;
