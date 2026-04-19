"use client";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const styles = {
  container: (base) => ({
    ...base,
    height: "42px",
    backgroundColor: "#fff",
    border: "1px solid #94a3b8",
    borderRadius: "4px",
    "&:hover": {
      borderColor: "#1e3a8a",
    },
    "&:focus": {
      borderColor: "#1e3a8a",
      borderWidth: "2px",
      boxShadow: "none",
    },
    "&:focus-within": {
      boxShadow: "none",
      borderColor: "#1e3a8a",
      borderWidth: "2px",
    },
  }),
  control: (base) => ({
    ...base,
    height: "100%",
    backgroundColor: "#fff",
    border: "none",
    "&:focus": {
      borderColor: "#1e3a8a",
      borderWidth: "2px",
      boxShadow: "none",
    },
    "&:focus-within": {
      boxShadow: "none",
      borderColor: "#1e3a8a",
      borderWidth: "2px",
    },
  }),
  input: (base) => ({
    ...base,
    border: "none",
    "&:focus": {
      border: "none",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    border: "none",
    "&:focus": {
      border: "none",
    },
  }),
};

export default function SelectView({
  title,
  name,
  required = false,
  className,
  type,
  value,
  onChange,
  placeholder,
  disabled,
  error,
  variant = "",
  ...props
}) {
  const hideMeta = variant === "page-limit";
  return (
    <div className="w-full flex flex-col gap-0.5">
      {!hideMeta && (
        <label className="text-sm">
          {title} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        name={name}
        required={required}
        className={`${className}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        styles={styles}
        {...props}
      />
      {!hideMeta && (
        <p className="h-4 text-xs text-red-500">{error ? error : ""}</p>
      )}
    </div>
  );
}
