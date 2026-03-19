"use client";

import { InputView, SelectView, ModalView, ButtonView } from "../components";

export default function TestScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1>Test Screen</h1>
      <div className="w-1/3 px-4">
        <InputView title="Name" name="name" type="text" />
        <SelectView title="Name" name="name" type="text" />
        <ButtonView
          title="Button"
          onClick={() => null}
          disabled={false}
          size="full"
          variant="primary"
        />
      </div>
      <ModalView />
    </div>
  );
}
