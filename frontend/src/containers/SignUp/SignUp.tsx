import "./SignUp.css";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [email, username, password, passwordConfirm]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
  };

  const handleCancel = async () => {
    navigate(`/login`);
  };
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail(email.trim());
    setUsername(username.trim());
    setPassword(password.trim());
    setPasswordConfirm(passwordConfirm.trim());

    if (
      email === "" ||
      username === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "/api/signup/",
        JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      ).then(response => {
        console.log(response);
        console.log(response.data);
      });

      //Todo: SignUp 성공 시 페이지에 아무 변화 없음
      //1. SignUp 성공했다는 것을 유저에게 알리기
      //2. Login 페이지로 이동

    } catch (error: any) {
      if (!error.response) {
        setError("Error connecting to server");
      } else if (error.response.status === 400) {
        setError("Email already exists");
      } else {
        setError("Error signing up");
      }
    }
  };

  return (
    <div className="SignUp">
      <h2>NotiManager</h2>
      <form onSubmit={handleSignUp}>
        <Stack spacing={2}>
          {error && <div className="error">{error}</div>}
          <TextField
            className="email"
            name="email"
            label="Email address"
            value={email}
            inputProps={{ "data-testid": "email-input" }}
            onChange={handleEmailChange}
          />
          <TextField
            className="username"
            name="username"
            label="Username"
            value={username}
            inputProps={{"data-testid" : "username-input"}}
            onChange={handleUsernameChange}
          />
          <TextField
            className="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            inputProps={{"data-testid" : "password-input"}}
            onChange={handlePasswordChange}
          />
          <TextField
            className="passwordConfirm"
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            value={passwordConfirm}
            inputProps={{"data-testid" : "password-confirm"}}
            onChange={handlePasswordConfirmChange}
          />
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            data-testid={"cancel-button"}
            onClick={() => handleCancel()}
          >
            Cancel
          </LoadingButton>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            data-testid={"signup-button"}
          >
            SignUp
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
}
