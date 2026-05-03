"use client";

import { useState } from "react";
import { useCustomerPlans } from "@/service/customerPlans/customerPlans.queries";

export const useCustomerPlansPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useCustomerPlans({
    page,
    limit,
  });

  const plans = data?.data || [];
  const pagination = data?.pagination || {};

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return {
    isLoading,
    plans,
    pagination,

    page,
    setPage,
    limit,
    setLimit,

    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
