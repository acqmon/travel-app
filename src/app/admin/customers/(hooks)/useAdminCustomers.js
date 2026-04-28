// app/admin/customers/(hooks)/useAdminCustomers.js
"use client";

import { useState, useMemo } from "react";
import { useCustomers } from "@/service/customer/customer.queries";

export const useAdminCustomers = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filters = useMemo(
    () => ({
      page,
      limit,
    }),
    [page, limit],
  );

  const { data, isLoading } = useCustomers(filters);

  const handleView = (row) => {
    console.log("View:", row);
  };

  const handleToggleStatus = (row) => {
    console.log(row.isActive ? "Disable Customer:" : "Enable Customer:", row);
  };

  return {
    data,
    isLoading,

    page,
    setPage,
    limit,
    setLimit,

    handleView,
    handleToggleStatus,
  };
};
