import { renderWithProviders } from "../../test-utils/mocks";
import TargetUserMultiSelect from "./TargetUserMultiSelect";
import { fireEvent, screen } from "@testing-library/react";

describe("<TargetUserMultiSelect />", () => {
  it("should render", () => {
    renderWithProviders(
      <TargetUserMultiSelect
        notification_type="webhook"
        selected={[]}
        setSelected={() => {}}
      />
    );
  });

  it("should render with selected", () => {
    const setSelected = jest.fn();
    renderWithProviders(
      <TargetUserMultiSelect
        notification_type="webhook"
        selected={[{ label: "test", value: 1 }]}
        setSelected={setSelected}
      />
    );
  });

});
