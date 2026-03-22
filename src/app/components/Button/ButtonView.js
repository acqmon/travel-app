export default function ButtonView({
  title,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  rounded = "md",
}) {
  const sizeClasses = {
    sm: "h-[40px] w-[80px] text-sm",
    md: "h-[40px] w-[150px] text-base",
    lg: "h-[40px] w-[200px] text-base",
    xl: "h-[40px] w-[250px] text-base",
    full: "h-[40px] w-full text-lg",
  };

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    xxl: "rounded-xxl",
    xxxl: "rounded-xxxl",
    full: "rounded-full",
  };

  const variantClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    accent: "bg-accent text-white",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  return (
    <button
      className={`${sizeClasses[size]} ${variantClasses[variant]} cursor-pointer ${disabledClasses} ${className} ${roundedClasses[rounded]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}
