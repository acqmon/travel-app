// app/admin/customers/(components)/AdminCustomersView.jsx
"use client";

import { ButtonView, DataTable, InputView } from "@/app/components";

export default function AdminCustomersView({
  data,
  isLoading,
  handleView,
  handleToggleStatus,
  page,
  setPage,
  limit,
  setLimit,
}) {
  const customers = data?.data || [];
  const pagination = data?.pagination || {};

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
      name: "Joined",
      selector: (row) => new Date(row.joinedAt).toLocaleDateString("en-IN"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          <ButtonView title="View" size="sm" onClick={() => handleView(row)} />

          <ButtonView
            title={row.isActive ? "Disable" : "Enable"}
            size="sm"
            onClick={() => handleToggleStatus(row)}
          />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-2 overflow-hidden">
      {/* Header */}
      <div className="h-[5%] flex justify-between items-center">
        <h3 className="font-semibold text-lg">Customers</h3>
      </div>

      <div className=" w-full h-[10%] flex items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          <InputView placeholder="Search" variant="search" />
          <ButtonView title={"Search"} />
        </div>
      </div>

      {/* Table */}
      <div className="table-pagination-wrapper h-[85%]">
        <DataTable
          columns={columns}
          data={customers}
          progressPending={isLoading}
          highlightOnHover
          responsive
          pagination
          paginationServer
          paginationTotalRows={pagination.total || 0}
          paginationPerPage={limit || 10}
          paginationDefaultPage={page}
          onChangePage={(p) => setPage(p)}
          onChangeRowsPerPage={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
