import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ProjectDetail from "./ProjectDetail";
import { store } from "../../store";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("ProjectDetail", () => {
  it("should render correctly", () => {
    render(
      <Provider store={store}>
        <ProjectDetail />
      </Provider>
    );
  });

  it("should handle create notification button", () => {
    render(
      <Provider store={store}>
        <ProjectDetail />
      </Provider>
    );

    const createNotificationButton = screen.getByTestId(
      "createNotificationButton"
    );
    expect(createNotificationButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createNotificationButton);
    });
  });

  it("should handle modal ", () => {
    render(
      <Provider store={store}>
        <ProjectDetail />
      </Provider>
    );

    const createNotificationButton = screen.getByTestId(
      "createNotificationButton"
    );
    expect(createNotificationButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(createNotificationButton);

      userEvent.keyboard("{esc}");
    });
  });
});
