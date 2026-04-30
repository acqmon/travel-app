"use client";

import { useState, useMemo } from "react";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant.js";
import { usePartnerActivities } from "@/service/partner/partner.queries";

export const usePartnerActivitiesPage = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const tabs = [
    { label: "All Activities", value: "ALL" },
    { label: "Pending", value: PARTNER_ACTIVITY_STATUS.PENDING },
    { label: "Approved", value: PARTNER_ACTIVITY_STATUS.APPROVED },
    { label: "Rejected", value: PARTNER_ACTIVITY_STATUS.REJECTED },
  ];

  // ✅ API call with pagination + filters
  const { data, isLoading } = usePartnerActivities({
    status: activeTab === "ALL" ? "all" : activeTab,
    page,
    limit,
  });

  const activities = data?.data || [];
  const pagination = data?.pagination || {};

  // ✅ Reset page on tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return {
    isLoading,

    tabs,
    activeTab,
    setActiveTab: handleTabChange,

    activities,
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
