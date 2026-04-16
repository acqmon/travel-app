"use client";

import CustomerRegisterForm from "./(components)/CustomerRegisterForm";
import { useCustomerRegister } from "./(hooks)/useCustomerRegister";

export default function CustomerRegisterPage() {
  const logic = useCustomerRegister();

  return <CustomerRegisterForm {...logic} />;
}
