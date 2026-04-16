"use client";

import PartnerRegisterForm from "../(components)/PartnerRegisterForm";
import { usePartnerRegister } from "../(hooks)/usePartnerRegister";

export default function PartnerRegisterPage() {
  const logic = usePartnerRegister();

  return <PartnerRegisterForm {...logic} />;
}
