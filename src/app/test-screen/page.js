"use client";

import {
  InputView,
  SelectView,
  ModalView,
  ButtonView,
  CardView,
  DataTable,
} from "../components";

export default function TestScreen() {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
  ];

  const data = [
    {
      name: "John Doe",
      email: "[EMAIL_ADDRESS]",
      role: "Admin",
    },
    {
      name: "Jane Doe",
      email: "[EMAIL_ADDRESS]",
      role: "User",
    },
  ];

  return (
    <div className="h-screen flex flex-col gap-4 p-4">
      <DataTable
        columns={columns}
        data={data}
        pagination={true}
        highlightOnHover={true}
      />
    </div>
  );
}
