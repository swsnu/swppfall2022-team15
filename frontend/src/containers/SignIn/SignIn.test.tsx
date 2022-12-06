import SignIn from "./SignIn";

import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/mocks";
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

describe("<SignIn />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    renderWithProviders(<SignIn />);

    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("signin")).toBeInTheDocument();
    expect(screen.getByTestId("signup")).toBeInTheDocument();
  });

  it("should navigate to signup page", () => {
    renderWithProviders(<SignIn />);

    fireEvent.click(screen.getByTestId("signup"));

    expect(mockNavigate).toBeCalledWith("/signup");
  });

  it("should show error message when submitted with empty inputs", async () => {
    renderWithProviders(<SignIn />);
    fireEvent.click(screen.getByTestId("signin"));

    const error = screen.findByTestId("error");

    expect((await error).textContent).toBe("Please fill in all fields");
  });

  it("should change email and pw input value", () => {
    renderWithProviders(<SignIn />);
    const emailInput = screen.getByLabelText("Email address");

    fireEvent.change(emailInput, { target: { value: "hello" } });

    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(passwordInput, { target: { value: "hello" } });

    expect(emailInput).toHaveValue("hello");
    expect(passwordInput).toHaveValue("hello");
  });

  it("should log in correctly", async () => {
    jest.spyOn(axios, "post").mockResolvedValue(
        Promise.resolve({
          status: 200,
          data: {
            token: "token",
          }
    }));

    renderWithProviders(<SignIn />);
    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByTestId("signin"));

  });

  it("should show error message when submitted - error logging in", async () => {
    jest.spyOn(axios, "post").mockImplementation( () => {
      return Promise.reject({response: {status: 500}})
    });

    renderWithProviders(<SignIn />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByTestId("signin"));

    const error = screen.findByTestId("error");

    expect((await error).textContent).toBe("Error logging in");
  });

  it("should show error message when submitted with invalid inputs", async () => {
    jest.spyOn(axios, "post").mockImplementation( () => {
      return Promise.reject({response: {status: 401}})
    });

    renderWithProviders(<SignIn />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByTestId("signin"));

    const error = screen.findByTestId("error");

    expect((await error).textContent).toBe("Invalid email or password");
  });

  it("should show error message when submitted - error connecting to server", async () => {
    jest.spyOn(axios, "post").mockImplementation( () => {
      return Promise.reject({response: null})
    });

    renderWithProviders(<SignIn />);

    fireEvent.change(screen.getByLabelText("Email address"), {
      target: { value: "test" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "test" },
    });
    fireEvent.click(screen.getByTestId("signin"));

    const error = screen.findByTestId("error");

    expect((await error).textContent).toBe("Error connecting to server");
  });
});
