import {fireEvent, render} from "@testing-library/react";
import TargetListTable from "./TargetList";
import {renderWithProviders} from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";

describe("TargetList", () => {
    it("renders correctly", () => {
        renderWithProviders(<TargetListTable/>);
    });

    it("should handle click create button", () => {
        const {getByTestId} = renderWithProviders(<TargetListTable/>);
        const createButton = getByTestId("create-button");
        fireEvent.click(createButton);
    });

    it("should handle click open menu", () => {
        const {getByTestId} = renderWithProviders(<TargetListTable/>, {preloadedState});
        const openMenuButton = getByTestId("open-menu");
        fireEvent.click(openMenuButton);
    });

    it("should handle click delete", () => {
        const {getByTestId} = renderWithProviders(<TargetListTable/>, {preloadedState});

        const openMenuButton = getByTestId("open-menu");
        fireEvent.click(openMenuButton);

        const deleteButton = getByTestId("delete-button");
        fireEvent.click(deleteButton);
    });
});
