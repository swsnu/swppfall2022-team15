import { useNavigate } from "react-router-dom";
import { MessageForm } from "./MessageForm";
import { TargetForm } from "./TargetForm";
import { NotificationForm } from "./NotificationForm";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// 있어야하는 내용
// 1. top bar로 현재 순서 알려주는 ui
// 2. 상태에 따라서 다른 화면 보여주는 것
// 3. 상태마다 next button, before button 보여주는 것

const steps = [
  "Create Your Message",
  "Create Your Target",
  "Create Your Notification",
];

export default function MultiStepForm() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

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
        <Stepper activeStep={activeStep}>
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
        {/* 만약 activeStep이 마지막 단계인 경우 Finish 관련 메시지 보여주고 버튼
      그렇지 않은 경우, 각 Step 보여줌 */}
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleFinish}>Finish</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <br />
            {activeStep === 0 ? <MessageForm /> : null}
            {activeStep === 1 ? <TargetForm /> : null}
            {activeStep === 2 ? <NotificationForm /> : null}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Grid>
      <Grid xs></Grid>
    </Grid>
  );
}
