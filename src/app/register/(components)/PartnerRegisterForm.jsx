"use client";

import { InputView, SelectView, ButtonView } from "@/app/components";

export default function PartnerRegisterForm({
  form,
  handleChange,
  handleSubmit,
  businessTypeOptions,
}) {
  return (
    <div className="h-screen w-full flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gray-900 text-white p-10 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Grow Your Business 🚀</h1>
        <p className="text-lg text-gray-300">
          Join our platform and reach thousands of customers.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 h-full flex flex-col p-6 bg-slate-medium">
        <div className="mb-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold">Partner Registration</h2>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
          {/* ACCOUNT */}
          <div>
            <h3 className="font-semibold mb-2">Account Info</h3>

            <div className="grid grid-cols-2 gap-2">
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

          {/* BUSINESS */}
          <div>
            <h3 className="font-semibold mb-2">Business Info</h3>

            <InputView
              title="Business Name"
              value={form.businessName}
              onChange={(e) => handleChange("businessName", e.target.value)}
            />

            <SelectView
              title="Business Type"
              options={businessTypeOptions}
              value={form.businessTypeId}
              onChange={(val) => handleChange("businessTypeId", val)}
            />

            <div className="grid grid-cols-2 gap-2">
              <InputView
                title="Phone Number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <InputView
                title="Alternate Phone"
                value={form.alternatePhone}
                onChange={(e) => handleChange("alternatePhone", e.target.value)}
              />
            </div>

            <InputView
              title="Website"
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />

            <InputView
              title="Description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          {/* ADDRESS */}
          <div>
            <h3 className="font-semibold mb-2">Address</h3>

            <InputView
              title="Address Line 1"
              value={form.addressLine1}
              onChange={(e) => handleChange("addressLine1", e.target.value)}
            />

            <InputView
              title="Address Line 2"
              value={form.addressLine2}
              onChange={(e) => handleChange("addressLine2", e.target.value)}
            />

            <InputView
              title="Zip Code"
              value={form.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
            />
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-semibold mb-2">Legal Details</h3>

            <div className="grid grid-cols-2 gap-2">
              <InputView
                title="GST Number"
                value={form.gstNumber}
                onChange={(e) => handleChange("gstNumber", e.target.value)}
              />
              <InputView
                title="PAN Number"
                value={form.panNumber}
                onChange={(e) => handleChange("panNumber", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="pt-4">
          <ButtonView title="Register" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
