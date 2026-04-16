"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterCustomer } from "@/service/auth.js/auth.queries";
import { ROLE } from "@/constants/role.constant";

export const useCustomerRegister = () => {
  const { mutate: registerCustomer, isPending } = useRegisterCustomer();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      role: ROLE.CUSTOMER,

      customerProfile: {
        phone: form.phone,
      },
    };

    registerCustomer(payload, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        alert(error?.response?.data?.message || "Registration failed");
      },
    });
  };

  return {
    form,
    handleChange,
    handleSubmit,
    isPending,
  };
};
