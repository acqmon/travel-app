export default function CardView({
  title,
  description,
  image,
  actions,
  className = "",
  children,
  size = "md",
}) {
  const sizeClasses = {
    sm: "w-[200px]",
    md: "w-[300px]",
    lg: "w-[400px]",
    xl: "w-[500px]",
    xxl: "w-[600px]",
    xxxl: "w-[700px]",
    full: "w-full",
  };

  return (
    <div
      className={`bg-white shadow-base  flex flex-col justify-center items-center gap-2 p-4 ${sizeClasses[size]} ${className} rounded-md`}
    >
      <div className="w-full flex flex-col justify-center items-center gap-1 ">
        <h1 className="text-lg font-bold text-center">{title}</h1>
        <p className="text-gray-600 text-center text-sm">{description}</p>
      </div>
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover mt-4"
        />
      )}
      <div className="w-full flex flex-col justify-center items-center gap-2 flex-1">
        {children}
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-2 ">
        {actions && (
          <div className="flex justify-end w-full align-end ">{actions}</div>
        )}
      </div>
    </div>
  );
}
