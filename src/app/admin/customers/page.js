// app/admin/customers/page.jsx
"use client";

import AdminCustomersView from "@/app/admin/customers/(components)/AdminCustomersView";
import { useAdminCustomers } from "@/app/admin/customers/(hooks)/useAdminCustomers";

export default function AdminCustomersPage() {
  const logic = useAdminCustomers();

  return <AdminCustomersView {...logic} />;
}
