import { Button, Dialog, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  createTarget,
  fetchTargets,
  targetSelect,
} from "../../store/slices/target";
import TargetUserMultiSelect from "../../components/TargetUserMultiSelect/TargetUserMultiSelect";
import { TargetUserForm } from "../../components/Targets/TargetUserForm";
import { FormWrapper } from "./FormWrapper";
import { TargetType, TargetUserIdNameDto } from "../../types";
import { EnumNotificationType } from "../../Enums";

interface IProps {
  notificationType: string;

  targetName: string;
  setTargetName: (name: string) => void;

  endpoint: string;
  setEndpoint: (endpoint: string) => void;

  data: any;
  setData: (data: any) => void;

  targetUserIdNameList: TargetUserIdNameDto[];
  setTargetUserIdNameList: (targetUser: TargetUserIdNameDto[]) => void;
}

export default function TargetUserStep(props: IProps) {
  const {
    notificationType,
    targetName,
    setTargetName,
    endpoint,
    setEndpoint,
    data,
    setData,
    targetUserIdNameList,
    setTargetUserIdNameList,
  } = props;

  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTargets());
  }, []);

  const targetState = useSelector(targetSelect);

  const clearForm = () => {
    setTargetName("");
    setEndpoint("");
    setData({});
  };

  const handleClickConfirm = async () => {
    if (
      (targetName && notificationType && endpoint) || // NON SLACK
      (notificationType == EnumNotificationType.SLACK.toString() &&
        targetName &&
        "api_key" in data) // SLACK
    ) {
      const requestData = {
        name: targetName,
        notification_type: notificationType,
        endpoint: endpoint,
        data: data,
      };
      dispatch(createTarget(requestData));
      dispatch(fetchTargets());
      setDialogOpen(false);
      clearForm();
    }
  };

  const form = TargetUserForm(props);

  return (
    <FormWrapper>
      <Dialog
        maxWidth="md"
        fullWidth
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      >
        <Grid
          container
          style={{ minHeight: "50vh" }}
          alignItems="top"
          justifyContent="top"
          marginTop={4}
        >
          <Grid lg />
          <Grid lg={10}>
            {form}
            <Button data-testid="confirm-button" onClick={handleClickConfirm}>
              Confirm
            </Button>
          </Grid>
          <Grid lg />
        </Grid>
      </Dialog>
      <Button variant="contained" onClick={() => setDialogOpen(true)}>
        Add now
      </Button>
      <TargetUserMultiSelect
        notification_type={props.notificationType}
        selected={targetUserIdNameList}
        setSelected={setTargetUserIdNameList}
        targetUsers={targetState.targets}
      />
    </FormWrapper>
  );
}
