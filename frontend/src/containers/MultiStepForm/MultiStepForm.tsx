import { useNavigate } from "react-router-dom";
import MessageStep from "./MessageStep";
import TargetUserStep from "./TargetUserStep";
import ReservationStep from "./ReservationStep";
import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import { MessageType, TargetUserIdNameDto } from "../../types";
import NotificationTypeForm from "./NotificationTypeStep";

const steps = ["Notification Type", "Message", "Target", "Reservaton"];

export default function MultiStepForm() {
  const navigate = useNavigate();

  // State
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [error, setError] = useState("");

  // Notification
  const [notificationType, setNotificationType] = useState("");

  // Message
  const [message, setMessage] = useState<MessageType | null>(null);
  // for create
  const [messageName, setMessageName] = useState("");
  const [content, setContent] = useState<any>({});
  const [fieldErrors, setFieldErrors] = useState<any>({});

  // Target
  const [targetUsers, setTargetUsers] = useState<TargetUserIdNameDto[]>([]);
  // for create
  const [targetName, setTargetName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [data, setData] = useState<any>({});

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (!notificationType) {
      setError("Notification Type is required");
      return;
    }

    if (activeStep === 2 && targetUsers.length === 0) {
      setError("This field is required");
      return;
    }

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
      <Grid xs={8}>
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
        <Fragment>
          <br />
          {activeStep === 0 && (
            <NotificationTypeForm
              notificationType={notificationType}
              setNotificationType={setNotificationType}
              error={error}
              setError={setError}
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
              error={error}
              setError={setError}
            />
          ) : null}
          {activeStep === 3 ? (
            <ReservationStep
              message={message!}
              targetUserIds={targetUsers}
              notificationType={notificationType}
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
        </Fragment>
      </Grid>
      <Grid xs></Grid>
    </Grid>
  );
}
