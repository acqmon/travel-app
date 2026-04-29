"use client";

import AdminActivitiesView from "@/app/admin/activities/(components)/AdminActivitiesView";
import { useAdminActivities } from "@/app/admin/activities/(hooks)/useAdminActivities";

export default function AdminActivitiesPage() {
  const logic = useAdminActivities();

  return <AdminActivitiesView {...logic} />;
}
