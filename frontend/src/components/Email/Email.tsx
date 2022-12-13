import {Button, Grid, InputLabel, TextField} from "@mui/material";
import {useState} from "react";

import {GoogleButton, IAuthorizationOptions,} from "react-google-oauth2";
import {useSelector} from "react-redux";
import {authSelector} from "../../store/slices/auth";


export const EmailForm = () => {
    const auth = useSelector(authSelector)

    const options: IAuthorizationOptions = {
        clientId: "857740213815-e07aikaf41mia75u98l19i5d1fng9cd2.apps.googleusercontent.com",
        redirectUri: "https://noti-manager.site/oauth-callback",
        scopes: ["https://www.googleapis.com/auth/gmail.send"],
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
          <InputLabel id="demo-simple-select-label">Email</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-name-input" }}
            value={auth.user?.email}
            disabled={true}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label">Username</InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            value={auth.user?.username}
            rows={1}
            disabled={true}
            required
          />
          <br />
          <br />
          <InputLabel id="demo-simple-select-label" margin="dense">
            Gmail Access
          </InputLabel>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            inputProps={{ "data-testid": "email-message-input" }}
            value={auth.user?.oauth?.toString()}
            disabled={true}
            required
          />
          <Button onClick={handleEmailClick}>Register Email</Button>
              {googleButton}
        </Grid>
        </>
      );

    return form;
}
