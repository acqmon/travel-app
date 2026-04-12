"use client";

import PartnerRegisterForm from "./(components)/PartnerRegisterForm";
import { usePartnerRegister } from "./(hooks)/usePartnerRegister";

export default function PartnerRegisterPage() {
  const logic = usePartnerRegister();

  return <PartnerRegisterForm {...logic} />;
}

// "use client";
// import { useState, useMemo } from "react";
// import { InputView, SelectView, ButtonView } from "@/app/components";
// import { useRegisterPartner } from "@/service/auth.js/auth.queries";
// import { useBusinessTypes } from "@/service/master/master.queries";
// import { useRouter } from "next/navigation";
// import { ROLE } from "@/constants/role.constant";

// const PartnerRegisterPage = () => {
//   const { mutate: registerPartner } = useRegisterPartner();
//   const router = useRouter();
//   const { data: businessTypes } = useBusinessTypes();
//   console.log("businessTypes", businessTypes);

//   const businessTypeOptions = useMemo(() => {
//     return (
//       businessTypes?.map((item) => ({
//         label: item.name,
//         value: item.id,
//       })) || []
//     );
//   }, [businessTypes]);

//   console.log("businessTypeOptions", businessTypeOptions);

//   // ✅ 1. State
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",

//     businessName: "",
//     businessTypeId: { label: "", value: "" },
//     phone: "",
//     alternatePhone: "",
//     website: "",
//     description: "",

//     addressLine1: "Lane no 1",
//     addressLine2: "street 41",
//     country: { label: "India", value: "India" },
//     state: { label: "Karnataka", value: "Karnataka" },
//     city: { label: "Bangalore", value: "Bangalore" },
//     zipCode: "560001",

//     gstNumber: "GST123456789",
//     panNumber: "PAN123456789",
//   });

//   // ✅ 2. Handle change
//   const handleChange = (key, value) => {
//     setForm((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   // ✅ 3. Submit handler
//   const handleSubmit = () => {
//     const payload = {
//       firstName: form.firstName,
//       lastName: form.lastName,
//       email: form.email,
//       password: form.password,
//       role: ROLE.PARTNER,

//       partnerProfile: {
//         businessTypeId: form.businessTypeId,
//         businessName: form.businessName,
//         phone: form.phone,
//         alternatePhone: form.alternatePhone,
//         website: form.website,
//         description: form.description,
//         addressLine1: form.addressLine1,
//         addressLine2: form.addressLine2,
//         city: form.city,
//         state: form.state,
//         country: form.country,
//         zipCode: form.zipCode,
//         gstNumber: form.gstNumber,
//         panNumber: form.panNumber,
//       },
//     };

//     registerPartner(payload, {
//       onSuccess: () => {
//         router.push("/login");
//       },
//     });
//   };

//   return (
//     <div className="h-screen w-full flex">
//       {/* LEFT SIDE */}
//       <div className="hidden md:flex w-1/2 bg-gray-900 text-white p-10 flex-col justify-center">
//         <h1 className="text-4xl font-bold mb-4">Grow Your Business 🚀</h1>
//         <p className="text-lg text-gray-300">
//           Join our platform and reach thousands of customers.
//         </p>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="w-full md:w-1/2 h-full flex flex-col p-6 bg-slate-medium">
//         <div className="mb-4 flex flex-col items-center">
//           <h2 className="text-2xl font-bold">Partner Registration</h2>
//         </div>

//         <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
//           {/* Account */}
//           <div>
//             <h3 className="font-semibold mb-2">Account Info</h3>
//             <div className="grid grid-cols-2 gap-2">
//               <InputView
//                 title="First Name"
//                 value={form.firstName}
//                 onChange={(e) => handleChange("firstName", e.target.value)}
//               />
//               <InputView
//                 title="Last Name"
//                 value={form.lastName}
//                 onChange={(e) => handleChange("lastName", e.target.value)}
//               />
//             </div>

//             <InputView
//               title="Email"
//               value={form.email}
//               onChange={(e) => handleChange("email", e.target.value)}
//             />

//             <InputView
//               title="Password"
//               type="password"
//               value={form.password}
//               onChange={(e) => handleChange("password", e.target.value)}
//             />

//             <InputView
//               title="Confirm Password"
//               type="password"
//               value={form.confirmPassword}
//               onChange={(e) => handleChange("confirmPassword", e.target.value)}
//             />
//           </div>

//           {/* Business */}
//           <div>
//             <h3 className="font-semibold mb-2">Business Info</h3>

//             <InputView
//               title="Business Name"
//               value={form.businessName}
//               onChange={(e) => handleChange("businessName", e.target.value)}
//             />

//             <SelectView
//               title="Business Type"
//               options={businessTypeOptions}
//               value={form.businessTypeId}
//               onChange={(val) => handleChange("businessTypeId", val)}
//             />

//             <div className="grid grid-cols-2 gap-2">
//               <InputView
//                 title="Phone Number"
//                 value={form.phone}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//               />
//               <InputView
//                 title="Alternate Phone"
//                 value={form.alternatePhone}
//                 onChange={(e) => handleChange("alternatePhone", e.target.value)}
//               />
//             </div>

//             <InputView
//               title="Website"
//               value={form.website}
//               onChange={(e) => handleChange("website", e.target.value)}
//             />

//             <InputView
//               title="Description"
//               value={form.description}
//               onChange={(e) => handleChange("description", e.target.value)}
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <h3 className="font-semibold mb-2">Address</h3>

//             <InputView
//               title="Address Line 1"
//               value={form.addressLine1}
//               onChange={(e) => handleChange("addressLine1", e.target.value)}
//             />

//             <InputView
//               title="Address Line 2"
//               value={form.addressLine2}
//               onChange={(e) => handleChange("addressLine2", e.target.value)}
//             />

//             <div className="grid grid-cols-3 gap-2">
//               <SelectView
//                 title="Country"
//                 options={["India"]}
//                 value={form.country}
//                 onChange={(val) => handleChange("country", val)}
//               />
//               <SelectView
//                 title="State"
//                 options={["Karnataka"]}
//                 value={form.state}
//                 onChange={(val) => handleChange("state", val)}
//               />
//               <SelectView
//                 title="City"
//                 options={["Bangalore"]}
//                 value={form.city}
//                 onChange={(val) => handleChange("city", val)}
//               />
//             </div>

//             <InputView
//               title="Zip Code"
//               value={form.zipCode}
//               onChange={(e) => handleChange("zipCode", e.target.value)}
//             />
//           </div>

//           {/* Legal */}
//           <div>
//             <h3 className="font-semibold mb-2">Legal Details</h3>

//             <div className="grid grid-cols-2 gap-2">
//               <InputView
//                 title="GST Number"
//                 value={form.gstNumber}
//                 onChange={(e) => handleChange("gstNumber", e.target.value)}
//               />
//               <InputView
//                 title="PAN Number"
//                 value={form.panNumber}
//                 onChange={(e) => handleChange("panNumber", e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Button */}
//         <div className="pt-4">
//           <ButtonView title="Register" size="full" onClick={handleSubmit} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PartnerRegisterPage;
