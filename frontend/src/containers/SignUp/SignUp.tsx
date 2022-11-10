import "./SignUp.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(event.target.value);
  };

  const handleCancel = async () => {
    navigate(`/login`);
  };
  const handleSignUp = async () => {
    //Todo: Implement SignUp
  };

  return (
    <div className="SignUp">
      <h2>NotiManager</h2>
      <form>
        <Stack spacing={2}>
          <TextField
            className="email"
            name="email"
            label="Email address"
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            className="username"
            name="username"
            label="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            className="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <TextField
            className="passwordConfirm"
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          />
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => handleCancel()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton

            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => handleSignUp()}
          >
            SignUp
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );

}
