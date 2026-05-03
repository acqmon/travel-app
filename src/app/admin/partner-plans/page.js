"use client";

import PartnerPlansView from "./(components)/PartnerPlansView";
import { usePartnerPlansPage } from "./(hooks)/usePartnerPlansPage";

export default function PartnerPlansPage() {
  const logic = usePartnerPlansPage();

  return <PartnerPlansView {...logic} />;
}
