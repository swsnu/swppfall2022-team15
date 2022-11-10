import { fireEvent, render, screen } from "@testing-library/react";

import NotiSidebar from "./NotiSidebar";
import { renderWithProviders } from "../../test-utils/mocks";
import { MemoryRouter, Route, Routes } from "react-router";

describe("Sidebar Testing", () => {
  it("should render correctly", () => {
    renderWithProviders(
      <MemoryRouter>
        <Routes>
          <Route path="" element={<NotiSidebar />} />
        </Routes>
      </MemoryRouter>
    );
    screen.getByText("Home");
    screen.getByText("Projects");
    screen.getByText("Targets");
    screen.getByText("Messages");
    screen.getByText("Templates");
    screen.getByText("History");
  });
});
