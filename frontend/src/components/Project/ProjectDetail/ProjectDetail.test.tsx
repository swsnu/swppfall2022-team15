import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ProjectDetail from "./ProjectDetail";
import { store } from "../../../store";
import userEvent from "@testing-library/user-event";

describe("ProjectDetail", () => {
  it("should render correctly", () => {
    render(
      <Provider store={store}>
        <ProjectDetail />
      </Provider>
    );
  });



});
