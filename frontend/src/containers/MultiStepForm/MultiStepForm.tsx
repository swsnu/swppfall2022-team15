import { useNavigate } from "react-router-dom";
import MessageStep from "./MessageStep";
import TargetUserStep from "./TargetUserStep";
import ReservationStep from "./ReservationStep";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import NotificationTypeForm from "./NotificationTypeStep";
import { MessageType, TargetType, TargetUserIdNameDto } from "../../types";
import { RecurrenceType } from "../../components/Recurrence";

const steps = ["Notification Type", "Message", "Target", "Reservaton"];

export default function MultiStepForm() {
  const navigate = useNavigate();

  // State
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  // Notification
  const [notificationType, setNotificationType] = React.useState("");

  // Message
  const [message, setMessage] = useState<MessageType | null>(null);
  // for create
  const [messageName, setMessageName] = useState("");
  const [content, setContent] = useState<any>({});
  const [fieldErrors, setFieldErrors] = useState<any>({});

  // Target
  const [targetUsers, setTargetUsers] = React.useState<TargetUserIdNameDto[]>(
    []
  );
  // for create
  const [targetName, setTargetName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [data, setData] = useState<any>({});

  // Reservation
  const [recurrence, setRecurrence] = React.useState<RecurrenceType>();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      navigate("/home");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleFinish = () => {
    navigate("/home");
  };

  return (
    <Grid
      container
      style={{ minHeight: "100vh" }}
      alignItems="top"
      justifyContent="top"
      marginTop={4}
    >
      <Grid xs></Grid>
      <Grid xs={6}>
        <Stepper data-testid="stepper" activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <React.Fragment>
          <br />
          {activeStep === 0 && (
            <NotificationTypeForm
              notificationType={notificationType}
              setNotificationType={setNotificationType}
            />
          )}
          {activeStep === 1 ? (
            <MessageStep
              name={messageName}
              setName={setMessageName}
              message={message}
              setMessage={setMessage}
              notificationType={notificationType}
              setData={setContent}
              data={content}
              fieldErrors={fieldErrors}
              setFieldErrors={setFieldErrors}
            />
          ) : null}
          {activeStep === 2 ? (
            <TargetUserStep
              notificationType={notificationType}
              targetName={targetName}
              setTargetName={setTargetName}
              endpoint={endpoint}
              setEndpoint={setEndpoint}
              data={data}
              setData={setData}
              targetUserIdNameList={targetUsers}
              setTargetUserIdNameList={setTargetUsers}
            />
          ) : null}
          {activeStep === 3 ? (
            <ReservationStep
              message={message!}
              targetUserIds={targetUsers}
              notificationType={notificationType}
              handleRecurrenceChange={setRecurrence}
            />
          ) : null}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              onClick={handleBack}
              sx={{ mr: 1 }}
              data-testid="back-button"
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {activeStep !== steps.length - 1 ? (
              <Button onClick={handleNext} data-testid="next-button">
                Next
              </Button>
            ) : (
              <Button onClick={handleFinish} data-testid="finish-button">
                Finish
              </Button>
            )}
          </Box>
        </React.Fragment>
      </Grid>
      <Grid xs></Grid>
    </Grid>
  );
}
