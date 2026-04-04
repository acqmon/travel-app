"use client";

import { useState } from "react";
import {
  ButtonView,
  DataTable,
  TabsView,
  ModalView,
  InputView,
  SelectView,
} from "@/app/components";
import { PARTNER_ACTIVITY_STATUS } from "@/constants/status.constant.js";

export default function PartnerActivities() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //  Tabs
  const tabs = [
    { label: "All Activities", value: "ALL" },
    { label: "Pending", value: PARTNER_ACTIVITY_STATUS.PENDING },
    { label: "Approved", value: PARTNER_ACTIVITY_STATUS.APPROVED },
    { label: "Rejected", value: PARTNER_ACTIVITY_STATUS.REJECTED },
  ];

  //  Dummy data (based on PartnerActivity model)
  const data = [
    {
      id: "1",
      activity: "Scuba Diving",
      category: "Water Sports",
      price: "₹3000",
      status: PARTNER_ACTIVITY_STATUS.PENDING,
      createdAt: "2024-03-28",
    },
    {
      id: "2",
      activity: "City Tour",
      category: "Sightseeing",
      price: "₹1500",
      status: PARTNER_ACTIVITY_STATUS.APPROVED,
      createdAt: "2024-03-25",
    },
    {
      id: "3",
      activity: "Mountain Trek",
      category: "Adventure",
      price: "₹2500",
      status: PARTNER_ACTIVITY_STATUS.REJECTED,
      createdAt: "2024-03-20",
    },
  ];

  //  Filter by tab
  const filteredData =
    activeTab === "ALL"
      ? data
      : data.filter((item) => item.status === activeTab);

  //  Columns
  const columns = [
    {
      name: "Activity Name",
      selector: (row) => row.activity,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
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
      cell: (row) => (
        <div className="flex gap-2">
          <ButtonView title="Edit" size="sm" variant="secondary" />
          <ButtonView title="Delete" size="sm" variant="primary" />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/*  Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-border-light">
        <div>
          <h3 className="font-bold text-2xl text-primary">My Activities</h3>
          <p className="text-sm text-clr-medium">
            Manage and list your special experiences
          </p>
        </div>
        <ButtonView
          title="+ Add New Activity"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/*  Brief Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Activities", value: data.length, color: "primary" },
          {
            label: "Approved",
            value: data.filter(
              (i) => i.status === PARTNER_ACTIVITY_STATUS.APPROVED,
            ).length,
            color: "green",
          },
          {
            label: "Pending",
            value: data.filter(
              (i) => i.status === PARTNER_ACTIVITY_STATUS.PENDING,
            ).length,
            color: "yellow-600",
          },
          {
            label: "Rejected",
            value: data.filter(
              (i) => i.status === PARTNER_ACTIVITY_STATUS.REJECTED,
            ).length,
            color: "red-500",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-lg border border-border-light shadow-sm"
          >
            <p className="text-sm font-medium text-clr-medium uppercase tracking-wider">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold text-${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/*  Tabs */}
      <TabsView tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/*  Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        responsive
      />

      {/*  Add Activity Modal */}
      <ModalView
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Activity"
      >
        <div className="flex flex-col gap-4 p-4">
          <SelectView
            label="Select Base Activity"
            placeholder="Search from existing activities..."
            options={[
              { value: "1", label: "Scuba Diving" },
              { value: "2", label: "City Tour" },
              { value: "3", label: "Mountain Trek" },
            ]}
          />
          <InputView
            label="Price (₹)"
            type="number"
            placeholder="Enter your price for this activity"
          />
          <div className="flex justify-end gap-2 mt-4">
            <ButtonView
              title="Cancel"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            />
            <ButtonView title="Submit for Approval" />
          </div>
        </div>
      </ModalView>
    </div>
  );
}
