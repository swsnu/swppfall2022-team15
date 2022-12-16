import { renderWithProviders } from "../../../test-utils/mocks";
import Today from "./Today";
import preloadedState from "../../../test-utils/mock_state";
import axios from "axios";

describe("Today", () => {
  it("should render correctly", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => {
      return Promise.resolve({
        data: {},
      })
    });
    renderWithProviders(<Today />);
  });  
});
