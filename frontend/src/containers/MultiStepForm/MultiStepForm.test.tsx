import { renderWithProviders } from "../../test-utils/mocks";
import MultiStepForm from "./MultiStepForm";
import { fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("MultiStepForm", () => {
  let multiStepForm: JSX.Element;

  beforeEach(() => {
    jest.clearAllMocks();
    multiStepForm = (
      <MemoryRouter>
        <MultiStepForm />
      </MemoryRouter>
    );
  });

  it("should render", () => {
    renderWithProviders(multiStepForm);
  });

  it("should handle next", () => {
    renderWithProviders(multiStepForm);
    fireEvent.click(screen.getByText("Next"));
  });

  it("should handle back", () => {
    renderWithProviders(multiStepForm);
    fireEvent.click(screen.getByText("Back"));
  });
/*
  it("should handle finish", () => {
    renderWithProviders(multiStepForm);
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Finish"));
    });

  it("should handle skip", () => {
    renderWithProviders(multiStepForm);
    fireEvent.click(screen.getByText("Skip"));
  });
  */
});
