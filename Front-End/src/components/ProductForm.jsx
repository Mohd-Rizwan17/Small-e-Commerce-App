import FormField from "./FormField";

const ProductForm = ({
  form,
  onChange,
  onSubmit,
  fieldErrors,
  isSubmitting,
  submitLabel,
}) => (
  <form onSubmit={onSubmit} noValidate className="space-y-4">
    <FormField
      label="Name"
      name="name"
      value={form.name}
      onChange={onChange}
      error={fieldErrors.name}
    />

    <div>
      <label
        htmlFor="description"
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        Description
      </label>
      <textarea
        id="description"
        name="description"
        rows={3}
        value={form.description}
        onChange={onChange}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 ${
          fieldErrors.description ? "border-red-500" : "border-gray-300"
        }`}
      />
      {fieldErrors.description && (
        <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
      )}
    </div>

    <FormField
      label="Price"
      name="price"
      type="number"
      value={form.price}
      onChange={onChange}
      error={fieldErrors.price}
    />
    <FormField
      label="Stock"
      name="stock"
      type="number"
      value={form.stock}
      onChange={onChange}
      error={fieldErrors.stock}
    />

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
    >
      {isSubmitting ? "Saving..." : submitLabel}
    </button>
  </form>
);

export default ProductForm;
