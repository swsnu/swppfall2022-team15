import "./SignIn.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //const [authorized, setAuthorized] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    navigate(`/home`);
  };
  const handleSignUp = () => {
    navigate(`/signup`);
  };

  return (
    <div className="SignIn">
      <h2>NotiManager</h2>
      <form>
        <Stack spacing={2}>
          <TextField
            name="email"
            label="Email address"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            name="password"
            label="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => handleSignIn()}
          >
            Login
          </LoadingButton>
          <br />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => handleSignUp()}
          >
            Sign Up
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
}
