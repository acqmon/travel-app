"use client";

import { InputView, ButtonView } from "@/app/components";

export default function CustomerRegisterForm({
  form,
  handleChange,
  handleSubmit,
  isPending,
}) {
  return (
    <div className="h-screen w-full flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gray-900 text-white p-10 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Amazing Services ✨
        </h1>
        <p className="text-lg text-gray-300">
          Book trusted professionals near you. Fast, easy, and reliable.
        </p>

        <div className="mt-10 space-y-3 text-sm text-gray-400">
          <p>✔ Verified partners</p>
          <p>✔ Easy booking</p>
          <p>✔ Secure payments</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 h-full flex flex-col p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm text-gray-500">Sign up to get started</p>
        </div>

        {/* Form */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="w-full grid grid-cols-2 gap-2">
            <InputView
              title="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <InputView
              title="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>

          <InputView
            title="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <InputView
            title="Phone Number"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <InputView
            title="Password"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />

          <InputView
            title="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </div>

        {/* Action */}
        <div className="mt-auto pt-6">
          <ButtonView
            title={isPending ? "Registering..." : "Register"}
            size="full"
            onClick={handleSubmit}
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
}
