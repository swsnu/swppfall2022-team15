import { Container, TextField } from "@mui/material";
import React, { useState } from "react";

export default function User() {
    const [username, setUsername] = useState<string>("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

   return (
     <>
     
       <Container>
         <TextField
           name="username"
           label="Username"
           value={username}
           onChange={handleUsernameChange}
         />
       </Container>
     </>
   ); 
}