"use client";

import { useState } from "react";
import { ModalView, InputView, ButtonView } from "@/app/components";
import { useCreateCustomerPlan } from "@/service/customerPlans/customerPlans.queries";

export default function CreateCustomerPlanModal({
  isModalOpen,
  handleCloseModal,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [credits, setCredits] = useState("");

  const { mutate, isPending } = useCreateCustomerPlan();

  const handleSubmit = () => {
    if (!name || !price || !credits) return;

    mutate(
      {
        name,
        price: Number(price),
        credits: Number(credits),
      },
      {
        onSuccess: () => {
          handleCloseModal();
          setName("");
          setPrice("");
          setCredits("");
        },
      },
    );
  };

  return (
    <ModalView
      showModal={isModalOpen}
      onClose={handleCloseModal}
      title="Create Customer Plan"
      size="ft"
    >
      <div className="flex flex-col gap-2">
        <InputView
          placeholder="Plan Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputView
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <InputView
          placeholder="Credits"
          value={credits}
          onChange={(e) => setCredits(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <ButtonView
            title="Cancel"
            variant="accent"
            onClick={handleCloseModal}
          />
          <ButtonView
            title={isPending ? "Saving..." : "Save"}
            variant="primary"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </ModalView>
  );
}
