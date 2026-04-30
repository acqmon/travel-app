"use client";

import {
  ButtonView,
  DataTable,
  TabsView,
  ModalView,
  InputView,
} from "@/app/components";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant.js";
import CreateActivityModal from "../(modals)/createActivityModal.js";

export default function PartnerActivitiesView({
  tabs,
  activeTab,
  setActiveTab,
  activities,
  isModalOpen,
  handleOpenModal,
  handleCloseModal,
  isLoading,

  masterActivities,

  // ✅ pagination props
  page,
  setPage,
  limit,
  setLimit,
  pagination,
}) {
  const columns = [
    {
      name: "Activity Name",
      selector: (row) => row.activity?.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.categories?.[0]?.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs capitalize ${
            row.status === PARTNER_ACTIVITY_STATUS.APPROVED
              ? "bg-green-light text-green"
              : row.status === PARTNER_ACTIVITY_STATUS.REJECTED
                ? "bg-red-100 text-red-500"
                : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {row.status}
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
          <ButtonView title="Delete" size="sm" variant="primary" />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-1 overflow-hidden">
      {/* Header */}
      <div className="h-[5%] flex justify-between items-center">
        <h3 className="font-semibold text-lg">Partner Activities</h3>
      </div>

      {/* Tabs + Search */}
      <div className="w-full h-[10%] flex items-center justify-between gap-2">
        <TabsView tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <div className="flex items-center gap-2">
          <InputView placeholder="Search" variant="search" />
          <ButtonView title="Search" />
        </div>
      </div>

      {/* Table */}
      <div className="table-pagination-wrapper h-[85%]">
        <DataTable
          columns={columns}
          data={activities}
          progressPending={isLoading}
          highlightOnHover
          responsive
          // ✅ SERVER PAGINATION
          pagination
          paginationServer
          paginationTotalRows={pagination.total || 0}
          paginationPerPage={limit || 10}
          // ✅ EVENTS
          onChangePage={(p) => setPage(p)}
          onChangeRowsPerPage={(newLimit) => {
            setPage(1);
            setLimit(newLimit);
          }}
        />
      </div>

      {/* Modal */}
      <CreateActivityModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        masterActivities={masterActivities?.data || []}
      />
    </div>
  );
}
