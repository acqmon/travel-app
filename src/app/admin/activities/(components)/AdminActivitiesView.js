"use client";

import { ButtonView, DataTable, InputView } from "@/app/components";

export default function AdminActivitiesView({
  data,
  isLoading,
  page,
  setPage,
  limit,
  setLimit,
  handleAdd,
  handleEdit,
  handleDelete,
}) {
  const activities = data?.data || [];
  const pagination = data?.pagination || {};

  const fallbackData = [
    {
      id: "1",
      name: "Scuba Diving",
      description: "Scuba Diving is a water sport",
      category: "Adventure",
      status: "Active",
    },
    {
      id: "2",
      name: "City Tour",
      description: "City Tour is a tour of the city",
      category: "Sightseeing",
      status: "Inactive",
    },
  ];

  const rows = activities.length ? activities : fallbackData;

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Actions",
      center: "true",
      cell: (row) => (
        <div className="flex gap-2">
          <ButtonView title="Edit" size="sm" onClick={() => handleEdit(row)} />

          <ButtonView
            title="Delete"
            size="sm"
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Activities</h3>
        <div className="flex gap-2">
          <ButtonView title="Add Category" onClick={handleAdd} />
          <ButtonView title="Add Activity" onClick={handleAdd} />
        </div>
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
          data={rows}
          progressPending={isLoading}
          highlightOnHover
          responsive
          pagination
          paginationServer
          paginationTotalRows={pagination.total || rows.length}
          paginationPerPage={limit}
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
