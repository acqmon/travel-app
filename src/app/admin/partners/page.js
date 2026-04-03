"use client";

import { useState } from "react";
import { ButtonView, DataTable, TabsView } from "@/app/components";

export default function AdminPartners() {
  const [activeTab, setActiveTab] = useState("PENDING");

  //  Tabs config (reusable format)
  const tabs = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  //  Dummy data (User + PartnerProfile)
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

  //  Filter based on tab
  const filteredData = data.filter((item) => item.status === activeTab);

  //  Table columns
  const columns = [
    {
      name: "Partner",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Business",
      selector: (row) => row.businessName,
    },
    {
      name: "Contact",
      cell: (row) => (
        <div className="flex flex-col text-xs">
          <span>{row.email}</span>
          <span className="text-clr-medium">{row.phone}</span>
        </div>
      ),
    },
    {
      name: "Location",
      selector: (row) => row.city,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.status === "APPROVED"
              ? "bg-green-light text-green"
              : row.status === "REJECTED"
                ? "bg-red-100 text-red-500"
                : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status === "PENDING" && (
            <>
              <ButtonView title="Approve" size="sm" />
              <ButtonView title="Reject" size="sm" />
            </>
          )}

          <ButtonView title="View" size="sm" />
        </div>
      ),
      width: "25%",
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/*  Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Partners</h3>
      </div>

      {/*  Reusable Tabs */}
      <TabsView tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/*  Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
}
