"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useActivities } from "@/service/activities/activities.queries";

export const useAdminActivities = () => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const filters = useMemo(
    () => ({
      page,
      limit,
    }),
    [page, limit],
  );

  const { data, isLoading } = useActivities(filters);

  const handleAdd = () => {
    router.push("/admin/activities/create");
  };

  const handleEdit = (row) => {
    router.push(`/admin/activities/edit/${row.id}`);
  };

  const handleDelete = (row) => {
    router.push(`/admin/activities/${row.id}`);
  };

  return {
    data,
    isLoading,

    page,
    setPage,
    limit,
    setLimit,

    handleAdd,
    handleEdit,
    handleDelete,
  };
};
