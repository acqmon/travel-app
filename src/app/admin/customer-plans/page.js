"use client";

import CustomerPlansView from "./(components)/CustomerPlansView";
import { useCustomerPlansPage } from "./(hooks)/useCustomerPlansPage";

export default function CustomerPlansPage() {
  const logic = useCustomerPlansPage();

  return <CustomerPlansView {...logic} />;
}
