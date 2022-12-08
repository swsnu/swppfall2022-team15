import {Grid} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {AppDispatch} from "../../../store";
import {fetchProject} from "../../../store/slices/project";
import CollapsibleTable from "../../Table/CollapsibleTable";
import {Container} from "@mui/system";
import MultiStepFormDialog from "../../../containers/MultiStepFormDialog/MultiStepFormDialog";
import "./ProjectDetail.css";
import {fetchNotificationConfigs, notificationConfigSelect} from "../../../store/slices/notificationConfig";

export default function ProjectDetail() {
  const [open, setOpen] = useState(false);

  // get projectId from url
  const { id } = useParams();
  const projectId = Number(id);

  // get notifications from backend
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProject(projectId));
    dispatch(fetchNotificationConfigs(projectId));
  }, [dispatch, projectId]);
  const notificationConfigState = useSelector(notificationConfigSelect);
  const notificationConfigList = notificationConfigState.notificationConfigs;

  // event handlers
  const handleCreateNotification = (event: React.MouseEvent) => {
    setOpen(true);
  };

  return (
    <>
      {/*<NotificationCreateModal*/}
      {/*  open={open}*/}
      {/*  handleClose={() => setOpen(false)}*/}
      {/*  />*/}
      {/*responsive, size*/}
      <MultiStepFormDialog open={open} onClose={() => setOpen(false)} />

      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="flex-end"
          className="projectDetailButton"
        >
          <Button
            data-testid="createNotificationButton"
            onClick={handleCreateNotification}
          >
            NEW RESERVATION
          </Button>
        </Grid>
        <CollapsibleTable notificationConfigs={notificationConfigList} />
      </Container>
    </>
  );
}
