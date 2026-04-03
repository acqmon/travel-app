"use client";

import { useState } from "react";
import { ButtonView, DataTable, TabsView } from "@/app/components";

export default function AdminListings() {
  const [activeTab, setActiveTab] = useState("PENDING");

  //  Tabs
  const tabs = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  //  Dummy data (based on PartnerActivity model)
  const data = [
    {
      id: "1",
      partner: "ABC Travels",
      activity: "Scuba Diving",
      price: "₹3000",
      status: "PENDING",
    },
    {
      id: "2",
      partner: "XYZ Tours",
      activity: "City Tour",
      price: "₹1500",
      status: "APPROVED",
    },
    {
      id: "3",
      partner: "Travel Pro",
      activity: "Mountain Trek",
      price: "₹2500",
      status: "REJECTED",
    },
  ];

  //  Filter by tab
  const filteredData = data.filter((item) => item.status === activeTab);

  //  Columns
  const columns = [
    {
      name: "Partner",
      selector: (row) => row.partner,
      sortable: true,
    },
    {
      name: "Activity",
      selector: (row) => row.activity,
    },
    {
      name: "Price",
      selector: (row) => row.price,
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
        <h3 className="font-semibold text-lg">Listings</h3>
      </div>

      {/*  Tabs */}
      <TabsView tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/*  Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
}
