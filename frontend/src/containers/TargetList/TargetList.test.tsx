import {fireEvent, screen} from "@testing-library/react";
import TargetListTable from "./TargetList";
import {renderWithProviders} from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";
import axios from "axios";

describe("TargetList", () => {
    it("renders correctly", () => {
        renderWithProviders(<TargetListTable/>);
    });

    it("should handle click create button", () => {
        renderWithProviders(<TargetListTable/>);
        const createButton = screen.getByTestId("create-button");
        fireEvent.click(createButton);
    });

    it("should handle click create button", () => {
        renderWithProviders(<TargetListTable/>);
        const createButton = screen.getByTestId("create-button");
        fireEvent.click(createButton);
        fireEvent.click(createButton);

    });

    it("should handle click open menu", () => {
        renderWithProviders(<TargetListTable/>, {preloadedState});
        const openMenuButton = screen.getByTestId("open-menu");
        fireEvent.click(openMenuButton);
    });

    it("should handle click delete", () => {
        jest.spyOn(axios, "delete").mockImplementation((url: string) => {
          return Promise.resolve();
        });
        renderWithProviders(<TargetListTable/>, {preloadedState});

        const openMenuButton = screen.getByTestId("open-menu");
        fireEvent.click(openMenuButton);

        const deleteButton = screen.getByTestId("delete-button");
        fireEvent.click(deleteButton);
    });

    it("should handle click close menu", () => {
        renderWithProviders(<TargetListTable/>, {preloadedState});
        const openMenuButton = screen.getByTestId("open-menu");
        fireEvent.click(openMenuButton);

        fireEvent.click(openMenuButton);
    });
});
