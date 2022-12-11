import { fireEvent, screen } from "@testing-library/react";
import TargetListTable from "./TargetList";
import { renderWithProviders } from "../../test-utils/mocks";
import userEvent from "@testing-library/user-event";

describe("TargetList", () => {
  it("renders correctly", () => {
    renderWithProviders(<TargetListTable />);
  });

  it("should handle click create button", () => {
    renderWithProviders(<TargetListTable />);
    const createButton = screen.getByTestId("create-button");
    fireEvent.click(createButton);
    userEvent.keyboard("{esc}");
  });

  it("should render slack table correctly", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "SLACK",
              endpoint: "test",
              data: {
                channel: "test",
                message: "test",
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-0"));

  });

  it("should render sms table correctly", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "SMS",
              endpoint: "test",
              data: {
                message: "test",
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-3"));
  });

  it("should render webhook table correctly", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "WEBHOOK",
              endpoint: "test",
              data: {
                message: "test",
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-2"));
  });

  it("should render email table correctly", () => {
    renderWithProviders(<TargetListTable />, {
      preloadedState: {
        target: {
          targets: [
            {
              id: 1,
              name: "test",
              notification_type: "EMAIL",
              endpoint: "test",
              data: {
                title: "test",
                content: "test",
              },
            },
          ],
          selectedTarget: null,
        },
      },
    });
    fireEvent.click(screen.getByTestId("tab-1"));
  });

  it("should handle click button", () => {
    renderWithProviders(<TargetListTable />);
    fireEvent.click(screen.getByTestId("create-button"));
  });

});
