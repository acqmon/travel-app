"use client";

import { useState } from "react";
import { usePartnerPlans } from "@/service/partnerPlans/partnerPlans.queries";

export const usePartnerPlansPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // filters
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { data, isLoading } = usePartnerPlans({
    page,
    limit,
    search,
    isActive,
  });

  const plans = data?.data || [];
  const pagination = data?.pagination || {};

  const handleOpenModal = () => {
    console.log("open modal");

    setEditData(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditData(null);
  };

  const handleEdit = (row) => {
    setEditData(row);
    setIsModalOpen(true);
  };

  return {
    plans,
    isLoading,
    pagination,

    page,
    setPage,
    limit,
    setLimit,

    search,
    setSearch,
    isActive,
    setIsActive,

    isModalOpen,
    handleOpenModal,
    handleCloseModal,

    editData,
    handleEdit,
  };
};
