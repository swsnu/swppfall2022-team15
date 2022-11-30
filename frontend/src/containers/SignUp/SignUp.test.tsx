import { renderWithProviders } from "../../test-utils/mocks";
import SignUp from "./SignUp";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";

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

describe("SignUp", () => {
  it("should render correctly", () => {
    renderWithProviders(<SignUp />);
  });

  it("should handle confirm button - success", async () => {
    jest.spyOn(axios, "post").mockImplementation((url: string) => {
      return Promise.resolve({ response: { status: 201 } });
    });
    window.alert = jest.fn();

    renderWithProviders(<SignUp />);

    const emailInput = screen.getByTestId("email-input");

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const signUpButton = screen.getByTestId("signup-button");

    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });
    fireEvent.click(signUpButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

  it("should handle confirm button - email already exists", async() => {
    jest.spyOn(axios, "post").mockImplementation((url: string) => {
      return Promise.reject({
        response: { status: 400 },
      });
    });

    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const signUpButton = screen.getByTestId("signup-button");
    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText("Email already exists")).toBeInTheDocument();
    });
  });

  it("should handle confirm button - fail response", async () => {
    renderWithProviders(<SignUp />);

    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const signUpButton = screen.getByTestId("signup-button");

    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(screen.getByText("Error connecting to server")).toBeInTheDocument()
    });
  });

  it("should handle confirm button - empty field", () => {
    renderWithProviders(<SignUp />);
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const signUpButton = screen.getByTestId("signup-button");

    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    fireEvent.click(signUpButton);
    screen.getByText("Please fill in all fields");
  });

  it("should handle confirm button - password-confirm-fail", () => {
    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const signUpButton = screen.getByTestId("signup-button");

    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "pw" } });

    fireEvent.click(signUpButton);

    screen.getByText("Passwords do not match");
  });

  it("should handle cancel button", () => {
    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const cancelButton = screen.getByTestId("cancel-button");

    fireEvent.change(emailInput, { target: { value: "email@email.com" } });
    fireEvent.change(usernameInput, { target: { value: "username" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });
    fireEvent.click(cancelButton);

  });
});
