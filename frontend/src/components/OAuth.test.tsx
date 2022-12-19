import OAuth from "./OAuth";
import { render } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router";
import { BrowserRouter } from "react-router-dom";

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

describe("OAuth", () => {
  it("temp", () => {
    expect(true).toBe(true);
  });
});
