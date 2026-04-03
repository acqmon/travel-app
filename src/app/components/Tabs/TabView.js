"use client";

export default function TabsView({ tabs = [], activeTab, onChange }) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-3 py-1 rounded text-sm transition ${
            activeTab === tab.value
              ? "bg-primary text-white"
              : "bg-clr-light text-clr-medium hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
