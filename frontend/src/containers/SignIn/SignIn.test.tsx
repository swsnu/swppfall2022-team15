import SignIn from "./SignIn";

import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test-utils/mocks";

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

  it("it should change email and pw input value", () => {
    renderWithProviders(<SignIn />);
    const emailInput = screen.getByLabelText("Email address");

    fireEvent.change(emailInput, { target: { value: "hello" } });

    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(passwordInput, { target: { value: "hello" } });

    expect(emailInput).toHaveValue("hello");
    expect(passwordInput).toHaveValue("hello");
  });

  it("should show error message when submitted with invalid inputs", async () => {
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
});
