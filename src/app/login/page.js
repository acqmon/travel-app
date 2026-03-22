"use client";
import { useState } from "react";
import { InputView, ButtonView, CardView } from "../components";

const Login = () => {
  const renderChildren = () => {
    return (
      <div className="w-full flex flex-col gap-1">
        <InputView title="Username" name="username" type="text" />
        <InputView title="Password" name="password" type="password" />
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div className="w-full flex flex-col gap-2">
        <ButtonView title="Login" size="full" />
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
