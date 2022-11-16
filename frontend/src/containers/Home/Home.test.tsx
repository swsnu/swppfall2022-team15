import Home from "./Home";
import {renderWithProviders} from "../../test-utils/mocks";
import preloadedState from "../../test-utils/mock_state";


jest.mock("react-apexcharts", () => ({
    __esModule: true,
    default: () => <div/>,
}));

describe('Home', () => {
    it('should render correctly', () => {
        renderWithProviders(<Home />, {preloadedState});
    });
});
