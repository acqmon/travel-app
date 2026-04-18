"use client";

import { useState, useMemo } from "react";
import { usePartners } from "@/service/partner/partner.queries";
import { PARTNER_STATUS } from "@/constants/status.constant";

export const useAdminPartners = () => {
  const [activeTab, setActiveTab] = useState(PARTNER_STATUS.PENDING);

  const tabs = [
    { label: "Pending", value: PARTNER_STATUS.PENDING },
    { label: "Approved", value: PARTNER_STATUS.APPROVED },
    { label: "Rejected", value: PARTNER_STATUS.REJECTED },
  ];

  //  memoize filters (IMPORTANT)
  const filters = useMemo(
    () => ({
      status: activeTab,
      page: 1,
      limit: 10,
    }),
    [activeTab],
  );

  //  API call
  const { data = [], isLoading } = usePartners(filters);

  const handleApprove = (row) => {
    console.log("Approve:", row);
    // TODO: call mutation
  };

  const handleReject = (row) => {
    console.log("Reject:", row);
    // TODO: call mutation
  };

  const handleView = (row) => {
    console.log("View:", row);
  };

  return {
    activeTab,
    setActiveTab,
    tabs,
    data,
    isLoading,
    handleApprove,
    handleReject,
    handleView,
  };
};
