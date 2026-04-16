"use client";

import CustomerRegisterForm from "./(components)/CustomerRegisterForm";
import { useCustomerRegister } from "./(hooks)/useCustomerRegister";
import LoaderView from "@/components/Loader/LoaderView";

export default function CustomerRegisterPage() {
  const logic = useCustomerRegister();

  return (
    <>
      {logic.isPending && <LoaderView label="Creating account..." />}
      <CustomerRegisterForm {...logic} />
    </>
  );
}
