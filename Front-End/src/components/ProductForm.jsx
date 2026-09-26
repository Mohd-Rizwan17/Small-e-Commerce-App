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

    <FormField
      label="Image URL"
      name="image"
      value={form.image}
      onChange={onChange}
      error={fieldErrors.image}
    />

    {form.image && (
      <img
        src={form.image}
        alt="Preview"
        className="h-32 w-full rounded-lg object-cover"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    )}

    <div>
      <label
        htmlFor="description"
        className="mb-1 block text-sm font-medium text-ink"
      >
        Description
      </label>
      <textarea
        id="description"
        name="description"
        rows={3}
        value={form.description}
        onChange={onChange}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent ${
          fieldErrors.description ? "border-red-500" : "border-ink/20"
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
      className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:brightness-110 disabled:opacity-60"
    >
      {isSubmitting ? "Saving..." : submitLabel}
    </button>
  </form>
);

export default ProductForm;
