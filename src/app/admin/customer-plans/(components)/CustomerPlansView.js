"use client";

import { ButtonView, DataTable, ModalView, InputView } from "@/app/components";
import CreateCustomerPlanModal from "../(modals)/CreateCustomerPlanModal";

export default function CustomerPlansView({
  plans,
  isLoading,
  isModalOpen,
  handleOpenModal,
  handleCloseModal,

  // pagination
  page,
  setPage,
  limit,
  setLimit,
  pagination,
}) {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Credits",
      selector: (row) => row.credits,
    },
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
      selector: (row) => row.createdAt,
    },
    {
      name: "Actions",
      cell: () => (
        <div className="flex gap-2">
          <ButtonView title="Edit" size="sm" variant="secondary" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Customer Plans</h3>{" "}
        <div className="flex gap-2">
          <ButtonView
            title="Add Plan"
            variant="primary"
            onClick={handleOpenModal}
          />
        </div>
      </div>

      {/* Search (optional for now) */}

      <div className=" w-full h-[10%] flex items-center justify-end gap-2">
        <div className="flex items-center gap-2">
          <InputView placeholder="Search" variant="search" />
          <ButtonView title="Search" variant="primary" />
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
      <CreateCustomerPlanModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}
