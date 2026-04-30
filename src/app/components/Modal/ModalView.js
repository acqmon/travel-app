"use client";

export default function ModalView({
  showModal = false,
  closeModal,
  title,
  size = "md",
  children,
}) {
  const sizeClasses = {
    fit: "w-fit h-fit",
    sm: "w-[300px] h-[200px]",
    md: "w-[500px] h-[400px]",
    lg: "w-[800px] h-[600px]",
    full: "w-full h-full",
  };
  return (
    showModal && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex items-center justify-center z-50">
        <div
          className={`${sizeClasses[size]} bg-white rounded-md p-4 flex flex-col gap-4`}
        >
          <div className="flex items-center justify-between">
            <h3>{title}</h3>
            <button onClick={closeModal}>Close</button>
          </div>
          {children}
        </div>
      </div>
    )
  );
}
