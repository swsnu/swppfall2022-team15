import {fireEvent, screen, render} from "@testing-library/react";
import CollapsibleTable from "./CollapsibleTable";
import preloadedState from "../../test-utils/mock_state";

describe("CollapsibleTable", () => {
    it("should render", () => {
        const notificationConfigs = preloadedState.notificationConfig.notificationConfigs;
        render(<CollapsibleTable notificationConfigs={notificationConfigs} /> );
    });

    it("should handle expand-button", () => {
        const notificationConfigs = preloadedState.notificationConfig.notificationConfigs;
        render(<CollapsibleTable notificationConfigs={notificationConfigs} /> );

        const expandButton = screen.getByTestId("expand-button");
        fireEvent.click(expandButton);
    });
});