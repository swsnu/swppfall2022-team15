import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import { fetchNotifcations, notificationListSelector } from "../../store/slices/notifications";
import { fetchProject } from "../../store/slices/project";
import NotificationCreateModal from "../NotificationCreateModal";
import CollapsibleTable from "../table/CollapsibleTable";



export default function ProjectDetail() {
  const [open, setOpen] = useState(false);

  // get projectId from url
  const {id} = useParams();
  const projectId = Number(id);
  
  // get notifications from backend
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProject(projectId));
    dispatch(fetchNotifcations(projectId));
  }, []);
  const notifications = useSelector(notificationListSelector);

  // event handlers
  const handleCreateNotification = (event: React.MouseEvent) => {
    console.log("create notification");
    setOpen(true);
  }

  return (
    <div>
      <NotificationCreateModal
        open={open}
        handleClose={() => setOpen(false)}
      ></NotificationCreateModal>

      <Grid container justifyContent="flex-end">
        <Button variant="contained" onClick={handleCreateNotification}>Create Notification</Button>      
      </Grid>
      <CollapsibleTable notifications={notifications} />
    </div>
  )
};
