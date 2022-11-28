import {useNavigate} from "react-router-dom";
import MessageForm from "./MessageForm";
import TargetForm from "./TargetForm";
import NotificationForm from "./NotificationForm";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import NotificationTypeForm from "./NotificaitonTypeForm";

const steps = [
  "Notification Type",
  "Message",
  "Target",
  "Notification Configuration",
];

export default function MultiStepForm() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [notificationType, setNotificationType] = React.useState("");

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
          {activeStep === 0 && <NotificationTypeForm notificationType={notificationType} setNotificationType={setNotificationType} />}
          {activeStep === 1 ? <MessageForm notificationType={notificationType} /> : null}
          {activeStep === 2 ? <TargetForm notificationType={notificationType} /> : null}
          {activeStep === 3 ? <NotificationForm /> : null}
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
