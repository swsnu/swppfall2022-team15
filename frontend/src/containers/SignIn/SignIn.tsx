import "./SignIn.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [email, password]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail(email.trim());
    setPassword(password.trim());

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    try {
      //Todo: fix url
      const response = await axios.post(
        "/api/users/login",
        JSON.stringify({
          email: email,
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

      if (response.status === 200) {
        navigate(`/home`);
      }
    } catch (error: any) {
      if (!error.response) {
        setError("Error connecting to server");
      } else if (error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("Error logging in");
      }
    }
  };

  const handleSignUp = () => {
    navigate(`/signup`);
  };

  return (
    <div className="SignIn">
      <h2>NotiManager</h2>
      <form onSubmit={handleSignIn}>
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
            className="password"
            name="password"
            label="Password"
            type="password"
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
          >
            Login
          </LoadingButton>
          <br />
          <LoadingButton
            fullWidth
            size="large"
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
