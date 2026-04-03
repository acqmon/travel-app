"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarView = ({ title = "Dashboard", menu = [] }) => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-primary text-white flex flex-col p-4 shadow-base">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>

      <div className="flex flex-col gap-1">
        {menu.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`px-3 py-2 rounded-md text-sm transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-clr-medium hover:bg-clr-light hover:text-black"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Footer inside sidebar */}
      <div className="mt-auto pt-4 border-t border-clr-light text-xs text-clr-medium">
        © 2026 Your App
      </div>
    </div>
  );
};

export default SidebarView;
