const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
}) => (
  <div>
    <label htmlFor={name} className="mb-1 block text-sm font-medium text-ink">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className={`w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent ${
        error ? "border-red-500" : "border-ink/20"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default FormField;
