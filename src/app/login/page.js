"use client";
import { useState } from "react";
import { InputView, ButtonView, CardView } from "../components";
import { useSignIn } from "@/service/auth.js/auth.queries";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/paths.constant";

const Login = () => {
  const router = useRouter();
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
    signIn(form, {
      onSuccess: () => {
        router.push(PATHS.ADMIN.DASHBOARD);
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
    <div className="h-screen w-full flex items-center justify-center">
      <CardView
        size="lg"
        title="Login"
        description="Enter your credentials to login"
        children={renderChildren()}
        actions={renderActions()}
      />
    </div>
  );
};

export default Login;
