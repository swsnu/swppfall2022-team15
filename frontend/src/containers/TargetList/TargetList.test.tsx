import {fireEvent, render} from "@testing-library/react";
import TargetListTable from "./TargetList";
import {renderWithProviders} from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";
import axios from "axios";

describe("TargetList", () => {
    it("renders correctly", () => {
        renderWithProviders(<TargetListTable/>);
    });

    it("should handle click create button", () => {
        const {getByTestId} = renderWithProviders(<TargetListTable/>);
        const createButton = getByTestId("create-button");
        fireEvent.click(createButton);
    });

    it("should handle click create button", () => {
        const {getByTestId} = renderWithProviders(<TargetListTable/>);
        const createButton = getByTestId("create-button");
        fireEvent.click(createButton);
        fireEvent.click(createButton);

    });

    it("should handle click open menu", () => {
        const {getByTestId} = renderWithProviders(<TargetListTable/>, {preloadedState});
        const openMenuButton = getByTestId("open-menu");
        fireEvent.click(openMenuButton);
    });

    it("should handle click delete", () => {
        jest.spyOn(axios, "delete").mockImplementation((url: string) => {
          return Promise.resolve();
        });
        const {getByTestId} = renderWithProviders(<TargetListTable/>, {preloadedState});

        const openMenuButton = getByTestId("open-menu");
        fireEvent.click(openMenuButton);

        const deleteButton = getByTestId("delete-button");
        fireEvent.click(deleteButton);
    });

    it("should handle click close menu", () => {
        const {getByTestId} = renderWithProviders(<TargetListTable/>, {preloadedState});
        const openMenuButton = getByTestId("open-menu");
        fireEvent.click(openMenuButton);

        fireEvent.click(openMenuButton);
    });
});
