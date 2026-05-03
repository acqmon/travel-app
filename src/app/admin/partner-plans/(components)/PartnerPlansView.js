"use client";

import { ButtonView, DataTable, InputView } from "@/app/components";
import CreatePartnerPlanModal from "../(modals)/CreatePartnerPlanModal";

export default function PartnerPlansView({
  plans,
  isLoading,
  isModalOpen,
  handleOpenModal,
  handleCloseModal,

  page,
  setPage,
  limit,
  setLimit,
  pagination,

  search,
  setSearch,
  isActive,
  setIsActive,

  editData,
  handleEdit,
}) {
  const columns = [
    { name: "Name", selector: (row) => row.name },
    { name: "Price", selector: (row) => row.price },
    {
      name: "Credit %",
      selector: (row) => `${row.creditLimitPercent}%`,
    },
    { name: "Booking Limit", selector: (row) => row.bookingLimit },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.isActive
              ? "bg-green-light text-green"
              : "bg-red-100 text-red-500"
          }`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      name: "Actions",
      cell: (row) => (
        <ButtonView
          title="Edit"
          size="sm"
          variant="secondary"
          onClick={() => handleEdit(row)}
        />
      ),
    },
  ];

  console.log("MODAL STATE:", isModalOpen);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Partner Plans</h3>

        <div className="flex gap-2">
          <ButtonView
            title="Add Plan"
            variant="primary"
            onClick={handleOpenModal}
          />
        </div>
      </div>

      {/* Search */}
      <div className=" w-full h-[10%] flex items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          <InputView
            placeholder="Search"
            variant="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ButtonView
            title="Search"
            variant="primary"
            onClick={() => setPage(1)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-pagination-wrapper h-[85%]">
        <DataTable
          columns={columns}
          data={plans}
          progressPending={isLoading}
          pagination
          paginationServer
          paginationTotalRows={pagination.total || 0}
          paginationPerPage={limit || 10}
          onChangePage={(p) => setPage(p)}
          onChangeRowsPerPage={(newLimit) => {
            setPage(1);
            setLimit(newLimit);
          }}
        />
      </div>

      {/* Modal */}
      <CreatePartnerPlanModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        editData={editData}
      />
    </div>
  );
}
