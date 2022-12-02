import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../../store";
import { fetchNotifications, notificationListSelector } from "../../../store/slices/notifications";
import { fetchProject } from "../../../store/slices/project";
import NotificationCreateModal from "../../Notification/NotificationCreateModal";
import CollapsibleTable from "../../Table/CollapsibleTable";
import { Container } from "@mui/system";

export default function ProjectDetail() {
  const [open, setOpen] = useState(false);

  // get projectId from url
  const {id} = useParams();
  const projectId = Number(id);
  
  // get notifications from backend
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProject(projectId));
    dispatch(fetchNotifications(projectId));
  }, [dispatch, projectId]);
  const notifications = useSelector(notificationListSelector);

  // event handlers
  const handleCreateNotification = (event: React.MouseEvent) => {
    setOpen(true);
  }

  return (
    <>
      <NotificationCreateModal
        open={open}
        handleClose={() => setOpen(false)}
      ></NotificationCreateModal>
      <Container>
        <Grid container justifyContent="flex-end">
          <Button data-testid="createNotificationButton" variant="contained" onClick={handleCreateNotification}>Create Notification</Button>
        </Grid>
        <CollapsibleTable notifications={notifications} />
      </Container>
    </>
  )
};
