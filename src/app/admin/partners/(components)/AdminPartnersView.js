"use client";

import { ButtonView, DataTable, TabsView } from "@/app/components";

export default function AdminPartnersView({
  activeTab,
  setActiveTab,
  tabs,
  data,
  isLoading,
  handleApprove,
  handleReject,
  handleView,
}) {
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
              <ButtonView
                title="Approve"
                size="sm"
                onClick={() => handleApprove(row)}
              />
              <ButtonView
                title="Reject"
                size="sm"
                onClick={() => handleReject(row)}
              />
            </>
          )}

          <ButtonView title="View" size="sm" onClick={() => handleView(row)} />
        </div>
      ),
      width: "25%",
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Partners</h3>
      </div>

      {/* Tabs */}
      <TabsView tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Table */}
      <DataTable
        columns={columns}
        data={data?.data}
        progressPending={isLoading}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
}
