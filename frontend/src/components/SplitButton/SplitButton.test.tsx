import SplitButton from "./SplitButton";
import { render, screen } from "@testing-library/react";

describe("SplitButton", () => {
  it("should render correctly", () => {
    render(
      <SplitButton
        mode="RESERVATION"
        setMode={() => {}}
        options={["RESERVATION", "IMMEDIATE"]}
        setOpen={() => {}}
      />
    );
  });


});
