import { renderWithProviders } from "../../test-utils/mocks";
import TargetUserMultiSelect from "./TargetUserMultiSelect";

describe("<TargetUserMultiSelect />", () => {
  it("should render", () => {
    renderWithProviders(
      <TargetUserMultiSelect
        selected={[]}
        setSelected={() => {}}
        targetUsers={[]}
      />
    );
  });

  it("should render with selected", () => {
    const setSelected = jest.fn();
    renderWithProviders(
      <TargetUserMultiSelect
        selected={[{ label: "test", value: 1 }]}
        setSelected={setSelected}
        targetUsers={[]}
      />
    );
  });

});
