import MessageCreateModal from "./MessageCreateModal";
import {renderWithProviders} from "../../test-utils/mocks";
import {fireEvent, screen} from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";

describe("MessageCreateModal", () => {
    it("should render", () => {
        renderWithProviders(<MessageCreateModal open={true} handleClose={() => {
        }}/>)
    });

    it("should handle create button correctly", () => {
        const {getByTestId} = renderWithProviders(
            <MessageCreateModal open={true} handleClose={() => {
            }}/>,
            {preloadedState}
        )

        const projectId = screen.getByTestId("project-id");
        fireEvent.change(projectId, {target: {value: "name"}});

        const contentInput = screen.getByTestId("content-input");
        fireEvent.change(contentInput, {target: {value: "content"}});

        const button = getByTestId("create-button");
        fireEvent.click(button);
    });

    it("should handle create button correctly - disable button", () => {
        const {getByTestId} = renderWithProviders(
            <MessageCreateModal open={true} handleClose={() => {
            }}/>,
            {preloadedState}
        )

        const projectId = screen.getByTestId("project-id");
        fireEvent.change(projectId, {target: {value: ""}});

        const contentInput = screen.getByTestId("content-input");
        fireEvent.change(contentInput, {target: {value: ""}});

        const button = getByTestId("create-button");
        fireEvent.click(button);
    });

})