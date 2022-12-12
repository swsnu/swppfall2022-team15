import TargetUserStep from "./TargetUserStep";
import { renderWithProviders } from "../../test-utils/mocks";


describe("TargetUserStep", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <TargetUserStep
        notificationType="test"
        targetName="test"
        setTargetName={() => {}}
        endpoint="test"
        setEndpoint={() => {}}
        data={{}}
        setData={() => {}}
        targetUserIdNameList={[]}
        setTargetUserIdNameList={() => {}}
      />
    );
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
