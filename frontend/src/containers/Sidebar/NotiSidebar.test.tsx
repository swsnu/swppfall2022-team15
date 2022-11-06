import { fireEvent, render, screen } from "@testing-library/react";

import NotiSidebar from "./NotiSidebar";
import { renderWithProviders } from "../../test-utils/mocks";

describe('Sidebar Testing', () => {
    it('should render correctly', () => {
        renderWithProviders(<NotiSidebar />)

        screen.getByText("Home")
        screen.getByText("Projects")
        screen.getByText("Targets")
        screen.getByText("Messages")
        screen.getByText("Templates")
        screen.getByText("History")
    })

    it('should collapse when icon is clicked', () => {
        renderWithProviders(<NotiSidebar />)

        const sidebar = screen.getByTestId('sidebar');

        expect(sidebar).toBeInTheDocument();

        const icon = screen.getByTestId("collapseIcon");
        fireEvent.click(icon);

        

        expect(sidebar).toHaveStyle({
            width: '80px'
        })
    })
})