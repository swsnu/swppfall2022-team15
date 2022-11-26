import { renderWithProviders } from "../../test-utils/mocks";
import SignUp from "./SignUp";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import React from "react";

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

  it("should handle confirm button", () => {
    jest.spyOn(axios, "post").mockImplementation((url: string) => {
      return Promise.resolve();
    });

    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    fireEvent.change(emailInput, { target: { value: "email@email.com" } });

    const usernameInput = screen.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "username" } });

    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const passwordConfirmInput = screen.getByTestId("password-confirm");
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    const signUpButton = screen.getByTestId("signup-button");
    fireEvent.click(signUpButton);
  });

  it("should handle confirm button - success", async() => {
    jest.spyOn(axios, "post").mockImplementation((url: string) => {
      return Promise.resolve( { response: { status: 201 } });
    });

    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    fireEvent.change(emailInput, { target: { value: "email@email.com" } });

    const usernameInput = screen.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "username" } });

    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const passwordConfirmInput = screen.getByTestId("password-confirm");
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    const signUpButton = screen.getByTestId("signup-button");
    fireEvent.click(signUpButton);
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
    act(() => {
      fireEvent.change(emailInput, { target: { value: "email@email.com" } });
      fireEvent.change(usernameInput, { target: { value: "username" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

      fireEvent.click(signUpButton);
    });
  });

  it("should handle confirm button - fail response", () => {
    jest.spyOn(axios, "post").mockImplementation((url: string) => {
      return Promise.reject({ response: { status: 500 } });
    });

    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const signUpButton = screen.getByTestId("signup-button");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "email@email.com" } });
      fireEvent.change(usernameInput, { target: { value: "username" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

      fireEvent.click(signUpButton);
    });
  });

  it("should handle confirm button - empty field", () => {
    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const signUpButton = screen.getByTestId("signup-button");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "email@email.com" } });
      fireEvent.change(usernameInput, { target: { value: "username" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

      fireEvent.click(signUpButton);
    });
  });

  it("should handle confirm button - password-confirm-fail", () => {
    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const passwordConfirmInput = screen.getByTestId("password-confirm");
    const signUpButton = screen.getByTestId("signup-button");
    act(() => {
      fireEvent.change(emailInput, { target: { value: "email@email.com" } });
      fireEvent.change(usernameInput, { target: { value: "username" } });
      fireEvent.change(passwordInput, { target: { value: "password" } });
      fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

      fireEvent.click(signUpButton);
    });
  });

  it("should handle cancel button", () => {
    renderWithProviders(<SignUp />);
    const emailInput = screen.getByTestId("email-input");
    fireEvent.change(emailInput, { target: { value: "email@email.com" } });

    const usernameInput = screen.getByTestId("username-input");
    fireEvent.change(usernameInput, { target: { value: "username" } });

    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(passwordInput, { target: { value: "password" } });

    const passwordConfirmInput = screen.getByTestId("password-confirm");
    fireEvent.change(passwordConfirmInput, { target: { value: "password" } });

    const cancelButton = screen.getByTestId("cancel-button");
    fireEvent.click(cancelButton);
  });

});
