import {Button, Dialog,} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {createTarget, fetchTargets, targetSelect} from "../../store/slices/target";
import {fetchProjects} from "../../store/slices/project";
import TargetUserMultiSelect from "../../components/TargetUserMultiSelect/TargetUserMultiSelect";
import {TargetCreateForm} from "../../components/Targets/TargetCreateForm";
import {FormWrapper} from "./FormWrapper";
import {TargetType} from "../../types";


interface IProps {
    notificationType: string;

    targetName: string;
    setTargetName: (name: string) => void;

    endpoint: string;
    setEndpoint: (endpoint: string) => void;

    data: any;
    setData: (data: any) => void;

    targetUser: TargetType | null;
    setTargetUser: (targetUser: TargetType) => void;
}

export default function TargetUserForm(props: IProps) {
  const {notificationType, targetName, setTargetName, endpoint, setEndpoint, data, setData, targetUser, setTargetUser} = props;

  const [selected, setSelected] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  const targetuserState = useSelector(targetSelect);
  const targetusers = targetuserState.targets;

  const handleClickConfirm = async () => {
    if (targetName && props.notificationType && endpoint) {
      const requestData = {
        name: targetName,
        notification_type: props.notificationType,
        endpoint: endpoint,
        data: props.data,
      };
      dispatch(createTarget(requestData));
      dispatch(fetchTargets());
      setDialogOpen(false)
    }
  };

  const form = TargetCreateForm(props);

  return (
    <FormWrapper>
        <Dialog
          maxWidth="md"
          fullWidth
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}>
          {form}
          <Button data-testid="confirm-button" onClick={handleClickConfirm}>Confirm</Button>
        </Dialog>
        <Button variant="contained" onClick={() => setDialogOpen(true)}>Add now</Button>
        <TargetUserMultiSelect notification_type={props.notificationType} selected={selected} setSelected={setSelected} />
    </FormWrapper>
  );
}
