"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterCustomer } from "@/service/auth.js/auth.queries";
import { ROLE } from "@/constants/role.constant";
import { toast } from "react-toastify";

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
      onSuccess: (response) => {
        toast.success(response.data.message || "Account created successfully");
        router.push("/login");
      },
      onError: (error) => {
        toast.error(error.message || "Registration failed");
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
