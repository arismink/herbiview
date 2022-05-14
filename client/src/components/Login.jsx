import { Link } from "react-router-dom";

import { useState } from "react";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    console.log(e)
  }

  return (
    <Container maxWidth="md">
      <AccountCircleIcon style={{ fontSize: 100, color: 'grey' }}/>
      <Typography variant="h4" margin={2}>Login</Typography>

      <Container
        component="form"
        sx={{
          width: 500,
          maxWidth: "100%",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
        >

        <form>

          <Box mb={2}>
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              fullWidth
              sx={{mb: 1}}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              sx={{mb: 1}}
            />

          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{mb: 4}}>Login</Button>

        </form>

        <Link to="/register">Don't have an account? Register here</Link>


       </Container>

    </Container>
  );
}