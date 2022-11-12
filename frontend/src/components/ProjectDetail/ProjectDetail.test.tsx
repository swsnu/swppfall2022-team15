import { render, screen } from "@testing-library/react";
import {Provider} from "react-redux";
import ProjectDetail from "./ProjectDetail";
import {store} from "../../store";


describe('ProjectDetail', () => {
    it('should render correctly', () => {
        const { container } = render(
            <Provider store={store}>
                <ProjectDetail />
            </Provider>
        );

        expect(container).toBeInTheDocument();
    });

    // handler
    it("should handle create notificaiton button", () => {
        const { getByText } = render(
            <Provider store={store}>
                <ProjectDetail />
            </Provider>
        );

        const createNotificationButton = getByText("Create Notification");
        expect(createNotificationButton).toBeInTheDocument();
        createNotificationButton.click();
    })
})