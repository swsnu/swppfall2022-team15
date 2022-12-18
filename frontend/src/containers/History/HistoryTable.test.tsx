import { renderWithProviders } from "../../test-utils/mocks";
import HistoryTable from "./HistoryTable";
import preloadedState from "../../test-utils/mock_state";

describe("HistoryTable", () => {
  it("should render", () => {
    renderWithProviders(<HistoryTable />);
  });

  it("should render notifications", () => {
    renderWithProviders(<HistoryTable />, { preloadedState });
  });
});
