"use client";

import { ButtonView, DataTable } from "@/app/components";

export default function AdminUsers() {
  //  Dummy data (represents Users with role = CUSTOMER)
  const data = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      status: "ACTIVE",
      createdAt: "2025-01-10",
    },
    {
      id: "2",
      name: "Anjali Verma",
      email: "anjali@example.com",
      status: "INACTIVE",
      createdAt: "2025-02-15",
    },
    {
      id: "3",
      name: "Vikram Singh",
      email: "vikram@example.com",
      status: "ACTIVE",
      createdAt: "2025-03-05",
    },
  ];

  //  Columns for react-data-table-component
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.status === "ACTIVE"
              ? "bg-green-light text-green"
              : "bg-clr-light text-clr-medium"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Joined",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <ButtonView title="View" size="sm" />
          <ButtonView
            title={row.status === "ACTIVE" ? "Disable" : "Enable"}
            size="sm"
          />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/*  Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Customers</h3>
      </div>

      {/*  Table */}
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
}
