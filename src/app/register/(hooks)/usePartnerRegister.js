"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useRegisterPartner } from "@/service/auth.js/auth.queries";
import { useBusinessTypes } from "@/service/master/master.queries";
import { ROLE } from "@/constants/role.constant";

export const usePartnerRegister = () => {
  const { mutate: registerPartner } = useRegisterPartner();
  const router = useRouter();

  const { data: businessTypes } = useBusinessTypes();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    businessName: "",
    businessTypeId: { label: "", value: "" },
    phone: "",
    alternatePhone: "",
    website: "",
    description: "",

    addressLine1: "Lane no 1",
    addressLine2: "street 41",
    country: { label: "India", value: "India" },
    state: { label: "Karnataka", value: "Karnataka" },
    city: { label: "Bangalore", value: "Bangalore" },
    zipCode: "560001",

    gstNumber: "GST123456789",
    panNumber: "PAN123456789",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const businessTypeOptions = useMemo(() => {
    return (
      businessTypes?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || []
    );
  }, [businessTypes]);

  const handleSubmit = () => {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role: ROLE.PARTNER,

      partnerProfile: {
        businessTypeId: form.businessTypeId?.value, // IMPORTANT FIX
        businessName: form.businessName,
        phone: form.phone,
        alternatePhone: form.alternatePhone,
        website: form.website,
        description: form.description,
        addressLine1: form.addressLine1,
        addressLine2: form.addressLine2,
        city: form.city?.value,
        state: form.state?.value,
        country: form.country?.value,
        zipCode: form.zipCode,
        gstNumber: form.gstNumber,
        panNumber: form.panNumber,
      },
    };

    registerPartner(payload, {
      onSuccess: () => router.push("/login"),
    });
  };

  return {
    form,
    handleChange,
    handleSubmit,
    businessTypeOptions,
  };
};
