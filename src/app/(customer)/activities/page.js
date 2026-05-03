"use client";

import CustomerActivitiesView from "./(components)/CustomerActivitiesView";
import { useCustomerActivitiesPage } from "./(hooks)/useCustomerActivitiesPage";

export default function CustomerActivitiesPage() {
  const logic = useCustomerActivitiesPage();

  return <CustomerActivitiesView {...logic} />;
}
