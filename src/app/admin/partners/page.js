"use client";

import AdminPartnersView from "@/app/admin/partners/(components)/AdminPartnersView";
import { useAdminPartners } from "@/app/admin/partners/(hooks)/useAdminPartners";

export default function AdminPartnersPage() {
  const logic = useAdminPartners();

  return <AdminPartnersView {...logic} />;
}
