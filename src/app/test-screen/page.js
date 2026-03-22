"use client";

import {
  InputView,
  SelectView,
  ModalView,
  ButtonView,
  CardView,
} from "../components";

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
        <CardView
          title="Card"
          description="Card description"
          image="https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_and_Lucia_02_With_Logos_landscape.93ab5523.jpg&w=640&q=75"
          size="xxxl"
          actions={
            <div className="w-full flex gap-2">
              <ButtonView
                title="Button"
                onClick={() => null}
                disabled={false}
                size="full"
                variant="primary"
              />
              <ButtonView
                title="Button"
                onClick={() => null}
                disabled={false}
                size="full"
                variant="primary"
              />
            </div>
          }
        />
      </div>
      <ModalView />
    </div>
  );
}
