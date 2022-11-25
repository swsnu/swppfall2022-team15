 import React, { useEffect, useState, ReactElement } from "react";
// import { useNavigate } from "react-router-dom";
// import { Stack, TextField } from "@mui/material";
// import { LoadingButton } from "@mui/lab";

// import axios from "axios";

// export default function useMultiStepForm(steps: ReactElement[]) {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);

//   function next() {
//     setCurrentStepIndex((i) => {
//       if (i >= steps.length - 1) {
//         return i;
//       }
//       return i + 1;
//     });
//   }

//   function back() {
//     setCurrentStepIndex((i) => {
//       if (i <= 0) {
//         return i;
//       }
//       return i - 1;
//     });
//   }

//   function goto(index: number) {
//     setCurrentStepIndex(index);
//   }

//   return {
//     currentStepIndex,
//     step: steps[currentStepIndex],
//     steps,
//     goto,
//     next,
//     back,
//   };
// }
