import { ModalView, ButtonView } from "@/app/components";

export default function DeleteActivityModel({
  showModal = true,
  setShowModal,
}) {
  return (
    <ModalView
      title="Delete Activity"
      showModal={showModal}
      setShowModal={setShowModal}
      size="sm"
    >
      <div className="flex flex-col gap-2">
        <div className="flex ">
          <p>Are you sure you want to delete this activity?</p>
        </div>
        <div className="flex items-center justify-end">
          <ButtonView title="Delete" />
        </div>
      </div>
    </ModalView>
  );
}
