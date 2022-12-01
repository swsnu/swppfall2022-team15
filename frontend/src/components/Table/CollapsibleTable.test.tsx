import {fireEvent, getByText, render} from "@testing-library/react";
import CollapsibleTable from "./CollapsibleTable";
import preloadedState from "../../test-utils/mock_state";

describe("CollapsibleTable", () => {
    it("should render", () => {
        const notifications = preloadedState.notification.notifications;
        render(<CollapsibleTable notifications={notifications} /> );
    });

    it("should handle expand-button", () => {
        const notifications = preloadedState.notification.notifications;
        const {getByTestId} = render(<CollapsibleTable notifications={notifications} /> );

        const expandButton = getByTestId("expand-button");
        fireEvent.click(expandButton);
    });
});