import MultiStepForm from "./MultiStepForm";
import { Provider } from "react-redux";
import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/mocks";
import { EnumNotificationType } from "../../Enums";
import preloadedState from "../../test-utils/mock_state";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    Navigate: (props: any) => {
      mockNavigate(props.to);
      return null;
    },
    useNavigate: () => mockNavigate,
  };
});

const useStateSpy = jest.spyOn(React, "useState");

describe("MultiStepForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    renderWithProviders(<MultiStepForm />);

    expect(screen.getByTestId("stepper")).toBeInTheDocument();
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-button")).toBeInTheDocument();
  });

  it("should navigate to home when back button is clicked at first stage", async () => {
    renderWithProviders(<MultiStepForm />);

    const stepper = screen.getByTestId("stepper");
    var activeStep = Number(stepper.getAttribute("activeStep"));

    if (activeStep === 0) {
      fireEvent.click(screen.getByTestId("back-button"));
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    }
  });

  it("should go back to previous stage when back button is clicked", async () => {
    renderWithProviders(<MultiStepForm />);

    const stepper = screen.getByTestId("stepper");
    var activeStep = Number(stepper.getAttribute("activeStep"));

    if (activeStep === 1) {
      fireEvent.click(screen.getByTestId("back-button"));
      expect(activeStep).toBe(0);
    } else if (activeStep === 2) {
      fireEvent.click(screen.getByTestId("back-button"));
      expect(activeStep).toBe(1);
    }
  });

  it("should navigate to home when finish button is clicked at last stage", async () => {
    renderWithProviders(<MultiStepForm />);

    const stepper = screen.getByTestId("stepper");
    var activeStep = Number(stepper.getAttribute("activeStep"));

    if (activeStep === 2) {
      fireEvent.click(screen.getByTestId("finish-button"));
      expect(mockNavigate).toHaveBeenCalledWith("/home");
    }
  });

  it("should go back to next stage when next button is clicked", async () => {
    renderWithProviders(<MultiStepForm />);

    const stepper = screen.getByTestId("stepper");
    var activeStep = Number(stepper.getAttribute("activeStep"));

    if (activeStep === 0) {
      fireEvent.click(screen.getByTestId("next-button"));
      expect(activeStep).toBe(1);
    } else if (activeStep === 1) {
      fireEvent.click(screen.getByTestId("next-button"));
      expect(activeStep).toBe(2);
    }
  });
});
