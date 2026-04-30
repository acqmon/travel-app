"use client";

import PartnerActivitiesView from "@/app/partner/activities/(components)/PartnerActivitiesView";
import { usePartnerActivitiesPage } from "@/app/partner/activities/(hooks)/usePartnerActivitiesPage";

export default function PartnerActivitiesPage() {
  const logic = usePartnerActivitiesPage();

  return <PartnerActivitiesView {...logic} />;
}
