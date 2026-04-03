"use client";
import { InputView, SelectView, ButtonView } from "@/app/components";

const PartnerRegisterPage = () => {
  return (
    <div className="h-screen w-full flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gray-900 text-white p-10 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">Grow Your Business 🚀</h1>
        <p className="text-lg text-gray-300">
          Join our platform and reach thousands of customers. Manage bookings,
          grow revenue, and scale effortlessly.
        </p>

        <div className="mt-10 space-y-3 text-sm text-gray-400">
          <p>✔ Easy onboarding</p>
          <p>✔ Verified customers</p>
          <p>✔ Business analytics</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 h-full flex flex-col p-6 bg-slate-medium">
        {/* Header */}
        <div className="mb-4 flex flex-col items-center">
          <h2 className="text-2xl font-bold">Partner Registration</h2>
          <p className="text-sm text-gray-500">
            Create your account and start your journey
          </p>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
          {/* Account Info */}
          <div>
            <h3 className="font-semibold mb-2">Account Info</h3>
            <div className="grid grid-cols-2 gap-2">
              <InputView title="First Name" />
              <InputView title="Last Name" />
            </div>
            <InputView title="Email" />
            <InputView title="Password" type="password" />
            <InputView title="Confirm Password" type="password" />
          </div>

          {/* Business Info */}
          <div>
            <h3 className="font-semibold mb-2">Business Info</h3>
            <InputView title="Business Name" />
            <SelectView
              title="Business Type"
              options={["Salon", "Gym", "Restaurant"]}
            />
            <div className="grid grid-cols-2 gap-2">
              <InputView title="Phone Number" />
              <InputView title="Alternate Phone" />
            </div>
            <InputView title="Website" />
            <InputView title="Description" />
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <InputView title="Address Line 1" />
            <InputView title="Address Line 2" />
            <div className="grid grid-cols-3 gap-2">
              <SelectView title="Country" options={["India"]} />
              <SelectView title="State" options={["Karnataka"]} />
              <SelectView title="City" options={["Bangalore"]} />
            </div>
            <InputView title="Zip Code" />
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-2">Legal Details</h3>
            <div className="grid grid-cols-2 gap-2">
              <InputView title="GST Number" />
              <InputView title="PAN Number" />
            </div>
          </div>
        </div>

        {/* Sticky Button */}
        <div className="pt-4">
          <ButtonView title="Register" size="full" />
        </div>
      </div>
    </div>
  );
};

export default PartnerRegisterPage;
