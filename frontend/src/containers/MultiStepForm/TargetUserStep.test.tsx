import TargetUserStep from "./TargetUserStep";
import { renderWithProviders } from "../../test-utils/mocks";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TargetUserStep", () => {
  it("should render", () => {
    renderWithProviders(
      <TargetUserStep
        notificationType="test"
        targetName="test"
        setTargetName={() => {}}
        endpoint="test"
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
        targetUser={null}
        setTargetUser={() => {}}
      />
    );
  });

  it("should handle click add now and close", () => {
    renderWithProviders(
      <TargetUserStep
        notificationType="test"
        targetName="test"
        setTargetName={() => {}}
        endpoint="test"
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
        targetUser={null}
        setTargetUser={() => {}}
      />
    );
    fireEvent.click(screen.getByText("Add now"));
    userEvent.keyboard("{esc}");
  });

  /*
it("should handle select", () => {
  renderWithProviders(
    <TargetUserStep
      notificationType="test"
      targetName="test"
      setTargetName={() => {}}
      endpoint="test"
      setEndpoint={() => {}}
      data={{}}
      setData={() => {}}
      targetUser={null}
      setTargetUser={() => {}}
    />
  );

  fireEvent.click(screen.getByText("Select"));
});

it("should handle click confirm", () => {
  renderWithProviders(
    <TargetUserStep
      notificationType="test"
      targetName="test"
      setTargetName={() => {}}
      endpoint="test"
      setEndpoint={() => {}}
      data={{}}
      setData={() => {}}
      targetUser={null}
      setTargetUser={() => {}}
    />
  );

  fireEvent.click(screen.getByText("Confirm"));
});
*/
});
