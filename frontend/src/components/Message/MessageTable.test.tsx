import { renderWithProviders } from "../../test-utils/mocks";
import MessageTable from "./MessageTable";

describe("MessageTable", () => {
  it("should render", () => {
    renderWithProviders(
      <MessageTable
        columns={["col1"]}
        rows={[{ content: { col1: "" } }]}
        keys={["col1"]}
        handleOpenMenu={() => {}}
      />
    );
  });
});
