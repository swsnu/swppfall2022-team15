import {Button, Grid, InputLabel, TextField} from "@mui/material";
import {useState} from "react";

import {
    GoogleButton,
    IAuthorizationOptions,
    isLoggedIn,
    createOAuthHeaders,
    logOutOAuthUser,
    GoogleAuth,
} from "react-google-oauth2";


export const EmailForm = () => {
    const [name, setName] = useState("");
    const [fieldErrors, setFieldErrors] = useState<any>();
    const disabled = false;

     const options: IAuthorizationOptions = {
        clientId: "857740213815-e07aikaf41mia75u98l19i5d1fng9cd2.apps.googleusercontent.com",
        redirectUri: "https://noti-manager.site:8000/api/gmail/",
        scopes: ["email"],
        includeGrantedScopes: true,
        accessType: "offline",
    };


    const handleEmailClick = () => {
        console.log("email click");
    }
    const googleButton = (
        <>
          <GoogleButton
              placeholder="demo/search.png" // Optional
              options={options}
              apiUrl="https://noti-manager.site:8000/"
              defaultStyle={true} // Optional
          />
        </>
    )

    const form = (
        <>
          <Grid>
          <InputLabel id="demo-simple-select-label">Name</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-name-input" }}
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
            rows={1}
            disabled={disabled}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Title</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-title-input" }}
            onChange={(event: any) => {
              setFieldErrors({ ...fieldErrors, title: undefined });
            }}
            value=""
            helperText={fieldErrors}
            error={Boolean(fieldErrors?.title)}
            rows={1}
            disabled={disabled}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            Message
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-message-input" }}
            onChange={(event: any) => {
              setFieldErrors({ ...fieldErrors, message: undefined });
            }}
            value={""}
            helperText={fieldErrors?.message}
            error={Boolean(fieldErrors?.message)}
            rows={8}
            disabled={disabled}
            required
          />
          <Button onClick={handleEmailClick}>Register Email</Button>
              {googleButton}
        </Grid>
        </>
      );

    return form;
}
