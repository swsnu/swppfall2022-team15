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
      alert("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      //Todo: fix url
      const response = await axios.post(
        "http://localhost:8000/api/signup/",
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
      );
      //Todo: token
      const token = response.data.token;

      if (response.status === 201) {
        navigate(`/login`);
      }
    } catch (error: any) {
      if (!error.response) {
        setError("Error connecting to server");
      } else if (error.response.status === 409) {
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
          >
            SignUp
          </LoadingButton>
        </Stack>
      </form>
    </div>
  );
}
