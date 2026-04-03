import { ModalView, ButtonView, InputView, SelectView } from "@/app/components";

export default function AddActivityModel({ showModal = true, setShowModal }) {
  return (
    <ModalView
      title="Add Activity"
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <div className="flex flex-col gap-2">
        <div className="flex ">
          <InputView title="Name" placeholder="Enter name" />
        </div>
        <div className="flex ">
          <SelectView title="Category" placeholder="Select category" />
        </div>
        <div className="flex ">
          <InputView title="Description" placeholder="Enter description" />
        </div>
        <div className="flex items-center justify-end">
          <ButtonView title="Add Activity" />
        </div>
      </div>
    </ModalView>
  );
}
