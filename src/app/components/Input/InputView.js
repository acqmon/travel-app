export default function InputView({
  title,
  name,
  required = true,
  className,
  type,
  value,
  onChange,
  placeholder,
  disabled,
  error,
}) {
  return (
    <div className="w-full flex flex-col gap-0.5">
      <label className="text-sm">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        required={required}
        className={`h-[42px] bg-white border border-border-medium rounded-sm hover:border-primary focus:border-2 focus:border-primary outline-none p-2 ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {<p className="h-4 text-xs text-red-500">{error ? error : ""}</p>}
    </div>
  );
}
