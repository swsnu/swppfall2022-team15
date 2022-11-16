import {renderWithProviders} from "../../test-utils/mocks";
import TargetCreateModal from "./TargetCreateModal";
import {fireEvent} from "@testing-library/react";
import preloadedState from "../../test-utils/mock_state";
import {EnumNotificationType} from "../../Enums";

describe("TargetCreateModal", () => {
    it("should render", () => {
        renderWithProviders(<TargetCreateModal open={true} handleClose={()=> {}} />)
    })

    it("should handle confirm create", () => {
        const {getByTestId} =  renderWithProviders(
            <TargetCreateModal open={true} handleClose={()=> {}} />,
            {preloadedState}
        )

        const targetInput = getByTestId("target-input");
        fireEvent.change(targetInput, {target: {value: "target"}});

        const projectType = getByTestId("project-type");
        fireEvent.change(projectType, {target: {value: EnumNotificationType.API}});

        const endpointInput = getByTestId("endpoint-input");
        fireEvent.change(endpointInput, {target : {value: "https://end.point"}})

        const projectId = getByTestId("project-id");
        fireEvent.change(projectId, {target: { value: 1}})

        const createButton = getByTestId("create-button")
        fireEvent.click(createButton);
    })
})