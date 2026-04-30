import { ModalView, SelectView, InputView, ButtonView } from "@/app/components";

export default function CreateActivityModal({
  isModalOpen,
  handleCloseModal,
  masterActivities,
}) {
  const options =
    masterActivities?.map((activity) => ({
      label: activity.name,
      value: activity.id,
    })) || [];

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
          placeholder={"Select Activity Name"}
        />
        <InputView placeholder="Price" variant="default" />
        <div className="flex justify-end gap-2">
          <ButtonView
            title="Cancel"
            variant="accent"
            onClick={handleCloseModal}
          />
          <ButtonView title="Save" variant="primary" />
        </div>
      </div>
    </ModalView>
  );
}
