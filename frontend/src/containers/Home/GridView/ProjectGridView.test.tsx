import GridLayout from "./ProjectGridView";

import { renderWithProviders } from "../../../test-utils/mocks";
import { ProjectType } from "../../../types";

const projects: ProjectType[] = [];

describe("<GridLayout />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    
    });

    it("should render correctly", () => {
        renderWithProviders(<GridLayout projects={projects}/>);
    
    });

});
