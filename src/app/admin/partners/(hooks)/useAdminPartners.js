"use client";

import { useState, useMemo } from "react";

export const useAdminPartners = () => {
  const [activeTab, setActiveTab] = useState("PENDING");

  const tabs = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  // Replace later with API
  const data = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      businessName: "ABC Travels",
      phone: "9876543210",
      city: "Goa",
      status: "PENDING",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      businessName: "XYZ Tours",
      phone: "9123456780",
      city: "Udupi",
      status: "APPROVED",
    },
    {
      id: "3",
      name: "Rahul Kumar",
      email: "rahul@example.com",
      businessName: "Travel Pro",
      phone: "9988776655",
      city: "Bangalore",
      status: "REJECTED",
    },
  ];

  const filteredData = useMemo(() => {
    return data.filter((item) => item.status === activeTab);
  }, [activeTab, data]);

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
    setActiveTab,
    tabs,
    filteredData,
    handleApprove,
    handleReject,
    handleView,
  };
};
