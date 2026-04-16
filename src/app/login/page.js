"use client";
import { useState } from "react";
import { InputView, ButtonView, CardView } from "../components";
import { useSignIn } from "@/service/auth.js/auth.queries";
import { useRouter, useSearchParams } from "next/navigation";
import { getDashboardByRole } from "@/lib/redirect";
import { toast } from "react-toastify";
import LoaderView from "@/app/components/Loader/LoaderView";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { mutate: signIn, isPending, isError, error } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    signIn(form, {
      onSuccess: (response) => {
        const role = response?.data?.role;
        console.log("role", role);
        toast.success(response.message || "Login successful");
        router.replace(redirect || getDashboardByRole(role));
      },
      onError: (error) => {
        toast.error(error.message || "Login failed");
      },
    });
  };

  const renderChildren = () => {
    return (
      <div className="w-full flex flex-col gap-1">
        <InputView
          title="Email"
          name="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
        <InputView
          title="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div className="w-full flex flex-col gap-2">
        <ButtonView title="Login" size="full" onClick={handleSubmit} />
      </div>
    );
  };

  return (
    <>
      {isPending && <LoaderView label="Logging in..." />}
      <div className="h-screen w-full flex items-center justify-center">
        <CardView
          size="lg"
          title="Login"
          description="Enter your credentials to login"
          children={renderChildren()}
          actions={renderActions()}
        />
      </div>
    </>
  );
};

export default Login;
