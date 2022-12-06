import { renderWithProviders } from "../../test-utils/mocks";
import HistoryTableHeadCell from "./TableCell";

describe("HistoryTableHeadCell", () => {
  it("should render", () => {
    const handleProjectOpen = jest.fn();
    const handleProjectClose = jest.fn();
    const handleProjectClick = jest.fn();
    const openProject = false;
    const anchorElProject = null;
    renderWithProviders(
      <HistoryTableHeadCell
        title={"Project"}
        handleOpen={handleProjectOpen}
        handleClose={handleProjectClose}
        handleClick={handleProjectClick}
        open={openProject}
        anchorEl={anchorElProject}
        selectedObjects={[]}
        selectedRange={null}
      />
    );
  });
});
