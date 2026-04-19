"use client";

import { useState, useMemo, useEffect } from "react";
import { usePartners } from "@/service/partner/partner.queries";
import { PARTNER_STATUS } from "@/constants/status.constant";

export const useAdminPartners = () => {
  const [activeTab, setActiveTab] = useState(PARTNER_STATUS.PENDING);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const tabs = [
    { label: "Pending", value: PARTNER_STATUS.PENDING },
    { label: "Approved", value: PARTNER_STATUS.APPROVED },
    { label: "Rejected", value: PARTNER_STATUS.REJECTED },
  ];

  const handleTabChange = (tab) => {
    setPage(1); // reset first
    setActiveTab(tab); // then change tab
  };

  const filters = useMemo(
    () => ({
      status: activeTab,
      page,
      limit,
    }),
    [activeTab, page, limit],
  );

  useEffect(() => {
    console.log("page", page);
  }, [limit]);

  const { data, isLoading } = usePartners(filters);

  const handleApprove = (row) => {
    console.log("Approve:", row);
  };

  const handleReject = (row) => {
    console.log("Reject:", row);
  };

  const handleView = (row) => {
    console.log("View:", row);
  };

  return {
    activeTab,
    setActiveTab: handleTabChange,
    tabs,
    data,
    isLoading,

    page,
    setPage,
    limit,
    setLimit,

    handleApprove,
    handleReject,
    handleView,
  };
};
