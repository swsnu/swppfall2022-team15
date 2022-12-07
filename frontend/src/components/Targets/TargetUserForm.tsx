import { EnumNotificationType } from "../../Enums";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState, ChangeEvent } from "react";
import { phoneNumberAutoFormat } from "./PhoneNumberAutoFormat";

interface IProps {
  notificationType: string;

  targetName: string;
  setTargetName: (name: string) => void;

  endpoint: string;
  setEndpoint: (endpoint: string) => void;

  data: any;
  setData: (data: any) => void;
}

export const TargetUserForm = (props: IProps) => {
  let form;
  const {
    notificationType,
    targetName,
    endpoint,
    setEndpoint,
    data,
    setData,
    setTargetName,
  } = props;

  const [apiAuth, setApiAuth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = phoneNumberAutoFormat(event.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const commonPart = (
    <>
      <InputLabel id="demo-simple-select-label">Name</InputLabel>
      <TextField
        id="target_name"
        fullWidth
        multiline
        inputProps={{ "data-testid": "target-input" }}
        autoFocus
        margin="dense"
        value={targetName}
        rows={1}
        required
        onChange={(event) => {
          setTargetName(event.target.value);
        }}
      />
      <br />
      <br />
    </>
  );

  let apiAuthForm;
  switch (apiAuth) {
    case "basic":
      apiAuthForm = (
        <>
          <InputLabel id="demo-simple-select-label">Username</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            type="text"
            fullWidth
            value={"username" in data ? data.username : ""}
            inputProps={{ "data-testid": "username-input" }}
            onChange={(event) => {
              setData({ ...data, username: event.target.value });
            }}
            required
          />
          <br />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Password</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            type="text"
            fullWidth
            value={"password" in data ? data.password : ""}
            inputProps={{ "data-testid": "password-input" }}
            onChange={(event) => {
              setData({ ...data, password: event.target.value });
            }}
            required
          />
          <br />
          <br />
          <br />
        </>
      );
      break;
    case "bearer":
      apiAuthForm = (
        <>
          <InputLabel id="demo-simple-select-label">Token</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="Bearer Token"
            type="text"
            fullWidth
            value={"token" in data ? data["token"] : ""}
            inputProps={{ "data-testid": "username-input" }}
            onChange={(event) => {
              setData({ ...data, token: event.target.value });
            }}
            required
          />
          <br />
          <br />
          <br />
        </>
      );
      break;
    case "api_key":
      apiAuthForm = (
        <>
          <InputLabel id="demo-simple-select-label">Key</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="key"
            type="text"
            fullWidth
            value={"key" in data ? data.key : ""}
            inputProps={{ "data-testid": "key-input" }}
            onChange={(event) => {
              setData({ ...data, key: event.target.value });
            }}
            required
          />
          <br />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Value</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="value"
            type="text"
            fullWidth
            value={"value" in data ? data.value : ""}
            inputProps={{ "data-testid": "value-input" }}
            onChange={(event) => {
              setData({ ...data, value: event.target.value });
            }}
            required
          />
          <br />
          <br />
          <br />
        </>
      );
      break;
  }

  switch (notificationType) {
    case EnumNotificationType.SLACK:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">API Token</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="api_token"
            type="text"
            fullWidth
            value={"api_key" in data ? data["api_key"] : ""}
            inputProps={{ "data-testid": "api-token-input" }}
            onChange={(event) => {
              setData({ api_key: event.target.value });
            }}
            required
          />
          <br />
          <br />
        </>
      );
      break;
    case EnumNotificationType.WEBHOOK:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">ENDPOINT</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="endpoint"
            type="text"
            fullWidth
            value={endpoint}
            inputProps={{ "data-testid": `endpoint-input` }}
            onChange={(event) => {
              setEndpoint(event.target.value);
            }}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Authorization</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={apiAuth}
            // label="project type"
            inputProps={{
              "data-testid": "type-input",
            }}
            onChange={(event: SelectChangeEvent) => {
              setApiAuth(event.target.value);
              setData({ auth: event.target.value });
            }}
            fullWidth
          >
            <MenuItem value={"no_auth"}>No Auth</MenuItem>
            <MenuItem value={"api_key"}>API Key</MenuItem>
            <MenuItem value={"bearer"}>Bearer Token</MenuItem>
            <MenuItem value={"basic"}>Basic Auth</MenuItem>
          </Select>
          <br />
          <br />
          {apiAuthForm}
        </>
      );
      break;
    case EnumNotificationType.EMAIL:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">Email Address</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="email_addr"
            type="text"
            fullWidth
            value={"email_addr" in data ? data["email_addr"] : ""}
            inputProps={{ "data-testid": "email-address-input" }}
            onChange={(event) => {
              setData({ email_addr: event.target.value });
            }}
            required
          />
          <br />
          <br />
        </>
      );
      break;
    case EnumNotificationType.SMS:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">Phone Number</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="phone_number"
            fullWidth
            value={phoneNumber}
            inputProps={{ "data-testid": "phone-number-input" }}
            onChange={onPhoneNumberChange}
            required
          />
        </>
      );
      break;
  }
  return (
    <>
      {commonPart}
      {form}
    </>
  );
};
