"use client";

import { ButtonView, DataTable, ModalView } from "@/app/components";
import { useRouter } from "next/navigation";

export default function AdminActivities() {
  const router = useRouter();

  const data = [
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
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.status === "Active"
              ? "bg-green-light text-green"
              : "bg-clr-light text-clr-medium"
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
          <ButtonView title="Edit" size="sm" />
          <ButtonView
            title="Delete"
            size="sm"
            onClick={() => router.push(`/admin/activities/${row.id}`)}
          />
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h3>Activities</h3>
          <ButtonView title="Add Activity" />
        </div>

        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </>
  );
}
