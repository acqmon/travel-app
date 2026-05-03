"use client";

import { useState, useMemo } from "react";
import { useCustomerActivities } from "@/service/customer/customer.queries";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400";

export const useCustomerActivitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");

  // ✅ pagination (future-ready)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useCustomerActivities({
    page,
    limit,
  });

  // ✅ categories (can later come from API)
  const categories = [
    { label: "All Categories", value: "ALL" },
    { label: "Tours & Activities", value: "TOURS_&_ACTIVITIES" },
  ];

  // ✅ MAP API → UI
  const activities = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((item) => ({
      id: item.id,

      name: item.activity?.name || "No Name",
      description: item.activity?.description || "No Description",

      category: item.categories?.[0]?.name || "Other",

      price: item.price,

      image: FALLBACK_IMAGE, // 🔥 no image in API
    }));
  }, [data]);

  // ✅ FILTERING
  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch = activity.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        category === "ALL" ||
        activity.category.toUpperCase().replace(/ /g, "_") === category;

      return matchesSearch && matchesCategory;
    });
  }, [activities, searchTerm, category]);

  return {
    isLoading,

    // data
    activities: filteredActivities,
    pagination: data?.pagination || {},

    // search
    searchTerm,
    setSearchTerm,

    // category
    category,
    setCategory,
    categories,

    // pagination (ready for later)
    page,
    setPage,
    limit,
    setLimit,
  };
};
