"use client";

import { Spinner } from "@heroui/react";

export default function LoaderView({ label = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="text-primary" size="lg" />
        <p className="text-white text-sm">{label}</p>
      </div>
    </div>
  );
}
