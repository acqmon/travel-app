"use client";

import { useState, useEffect } from "react";
import { ModalView, InputView, ButtonView } from "@/app/components";
import {
  useCreatePartnerPlan,
  useUpdatePartnerPlan,
} from "@/service/partnerPlans/partnerPlans.queries";

export default function CreatePartnerPlanModal({
  isModalOpen,
  handleCloseModal,
  editData = null,
}) {
  const isEdit = !!editData;

  const [form, setForm] = useState({
    name: "",
    price: "",
    creditLimitPercent: "",
    bookingLimit: "",
    isActive: true,
  });

  const { mutate: createPlan, isPending: isCreating } = useCreatePartnerPlan();

  const { mutate: updatePlan, isPending: isUpdating } = useUpdatePartnerPlan();

  // populate edit data
  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name || "",
        price: editData.price || "",
        creditLimitPercent: editData.creditLimitPercent || "",
        bookingLimit: editData.bookingLimit || "",
        isActive: editData.isActive ?? true,
      });
    }
  }, [editData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      name: form.name,
      price: Number(form.price),
      creditLimitPercent: Number(form.creditLimitPercent),
      bookingLimit: Number(form.bookingLimit),
      isActive: form.isActive,
    };

    if (isEdit) {
      updatePlan(
        {
          id: editData.id,
          data: payload,
        },
        {
          onSuccess: handleCloseModal,
        },
      );
    } else {
      createPlan(payload, {
        onSuccess: handleCloseModal,
      });
    }
  };

  return (
    <ModalView
      showModal={isModalOpen}
      onClose={handleCloseModal}
      title={isEdit ? "Edit Partner Plan" : "Create Partner Plan"}
      size="ft"
    >
      <div className="flex flex-col gap-2">
        <InputView
          placeholder="Plan Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <InputView
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />

        <InputView
          placeholder="Credit Limit %"
          type="number"
          value={form.creditLimitPercent}
          onChange={(e) => handleChange("creditLimitPercent", e.target.value)}
        />

        <InputView
          placeholder="Booking Limit"
          type="number"
          value={form.bookingLimit}
          onChange={(e) => handleChange("bookingLimit", e.target.value)}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <ButtonView
            title="Cancel"
            variant="accent"
            onClick={handleCloseModal}
          />

          <ButtonView
            title={isEdit ? "Update" : "Create"}
            variant="primary"
            onClick={handleSubmit}
            loading={isCreating || isUpdating}
          />
        </div>
      </div>
    </ModalView>
  );
}
