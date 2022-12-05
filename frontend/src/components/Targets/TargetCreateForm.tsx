import {EnumNotificationType} from "../../Enums";
import {InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {useState} from "react";

interface IProps {
    notificationType: string;

    targetName: string;
    setTargetName: (name: string) => void;

    endpoint: string;
    setEndpoint: (endpoint: string) => void;

    data: any;
    setData: (data: any) => void;
}

export const TargetCreateForm = (props: IProps) => {
  let form;
  const {notificationType, targetName, endpoint, setEndpoint, data, setData, setTargetName} = props;

  const [apiAuth, setApiAuth] = useState("");

  const commonPart = (
    <>
      <InputLabel id="demo-simple-select-label">Name</InputLabel>
        <TextField
          autoFocus
          margin="dense"
          id="target_name"
            // Label="target name"
          type="text"
          fullWidth
          variant="standard"
          value={targetName}
          inputProps={{ "data-testid": "target-input" }}
          onChange={(event) => {setTargetName(event.target.value);}}
          required/>
        <br />
        <br />
        <br />
    </>
  )

  let apiAuthForm;
  switch (apiAuth) {
      case "Basic Auth":
        apiAuthForm = (
          <>
            <InputLabel id="demo-simple-select-label">Username</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="username"
              type="text"
              fullWidth
              variant="standard"
              value={"username" in data ? data.username : ""}
              inputProps={{ "data-testid": "username-input" }}
              onChange={(event) => {
                setData({username: event.target.value, ...data, });
              }}
              required/>
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
              variant="standard"
              value={"password" in data? data.password : ""}
              inputProps={{ "data-testid": "password-input" }}
              onChange={(event) => {
                setData({password: event.target.value, ...data, });
              }}
              required/>
            <br />
            <br />
            <br />
          </>)
          break;
        case "Bearer Token":
          apiAuthForm = (
            <>
            <InputLabel id="demo-simple-select-label">Token</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="Bearer Token"
              type="text"
              fullWidth
              variant="standard"
              value={"b" in data ? data["username"] : ""}
              inputProps={{ "data-testid": "username-input" }}
              onChange={(event) => {
                setData({username: event.target.value, ...data, });
              }}
              required/>
            <br />
            <br />
            <br />
            </>
          )
          break;
        case "API Key":
          apiAuthForm = (
            <>
            <InputLabel id="demo-simple-select-label">Key</InputLabel>
            <TextField
              autoFocus
              margin="dense"
              id="key"
              type="text"
              fullWidth
              variant="standard"
              value={"key" in data ? data.key : ""}
              inputProps={{ "data-testid": "username-input" }}
              onChange={(event) => {
                setData({...data, ["key"]: event.target.value});
              }}
              required/>
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
              variant="standard"
              value={"value" in data ? data.value : ""}
              inputProps={{ "data-testid": "username-input" }}
              onChange={(event) => {
                setData({ ...data, ["value"]: event.target.value, });
              }}
              required/>
            <br />
            <br />
            <br />
            </>

          )
          break;
  }


  switch (notificationType) {
    case EnumNotificationType.API:
      form = (
        <>
          <InputLabel id="demo-simple-select-label">ENDPOINT</InputLabel>
          <TextField
              autoFocus
              margin="dense"
              id="endpoint"
              type="text"
              fullWidth
              variant="standard"
              value={endpoint}
              inputProps={{ "data-testid": `endpoint-input` }}
              onChange={(event) => {
                setEndpoint(event.target.value);
              }}
              required/>
          <br />
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
              setData({auth: event.target.value, ...data, });
            }}
            fullWidth
          >
            <MenuItem value={"No Auth"}>No Auth</MenuItem>
            <MenuItem value={"API Key"}>API Key</MenuItem>
            <MenuItem value={"Bearer Token"}>Bearer Token</MenuItem>
            <MenuItem value={"Basic Auth"}>Basic Auth</MenuItem>
          </Select>
          <br />
          <br />
          <br />
          {apiAuthForm}
        </>
      );
      break;
    case EnumNotificationType.EMAIL:
      form = <></>;
      break;
    case EnumNotificationType.SMS:
      form = <></>
      break;
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
              variant="standard"
              value={'api-key' in data ? data["api-key"] : ""}
              inputProps={{ "data-testid": "api-token-input" }}
              onChange={(event) => {
                setData({['api-key']: event.target.value});
              }}
              required/>
        <br />
        <br />
        <br />
        </>
      );
      break;

    }
    return (
        <>
            {commonPart}
            {form}
        </>
    )
}
