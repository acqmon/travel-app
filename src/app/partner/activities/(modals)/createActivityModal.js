"use client";

import { useState } from "react";
import { ModalView, SelectView, InputView, ButtonView } from "@/app/components";
import { useCreatePartnerActivity } from "@/service/partner/partner.queries";

export default function CreateActivityModal({
  isModalOpen,
  handleCloseModal,
  masterActivities,
}) {
  const [activity, setActivity] = useState(null);
  const [price, setPrice] = useState("");

  const { mutate, isPending } = useCreatePartnerActivity();

  const options =
    masterActivities?.map((activity) => ({
      label: activity.name,
      value: activity.id,
    })) || [];

  const handleSubmit = () => {
    if (!activity?.value || !price) return;

    mutate(
      {
        activityId: activity?.value,
        price: Number(price),
      },
      {
        onSuccess: () => {
          handleCloseModal();
          setActivity(null);
          setPrice("");
        },
      },
    );
  };

  return (
    <ModalView
      showModal={isModalOpen}
      onClose={handleCloseModal}
      title="Create Activity"
      size="ft"
    >
      <div className="flex flex-col gap-2">
        <SelectView
          variant="default"
          options={options}
          placeholder="Select Activity Name"
          value={activity}
          onChange={(val) => setActivity(val)}
        />

        <InputView
          placeholder="Price"
          variant="default"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
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
