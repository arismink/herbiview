import { useState, useContext } from 'react';
import { authContext } from 'providers/AuthProvider';

import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Login() {
  // use auth context given by providers/AuthProvider.js
  const { login } = useContext(authContext);

  // register lets you register an input and apply validation rules on it
  const { register, handleSubmit } = useForm();

  // function handle login data
  const handleLogin = data => {
    console.log("handle login", data);
    login(data.email, data.password);
  };

  const onErrors = errors => console.error(errors)

  return (
    <Container
      sx={{mt: 5}}
      maxWidth="md">

      <AccountCircleIcon style={{ fontSize: 100, color: 'grey' }}/>
      <Typography variant="h4" margin={2}>Login</Typography>

      <Container
        sx={{
          width: 500,
          maxWidth: "100%",
          alignItems: "center",
        }}
        noValidate

        >

        <form
          autoComplete="off"
          onSubmit={handleSubmit(handleLogin, onErrors)}>


          <Box mb={2}>
            <TextField
              required
              id="outlined-email-input"
              label="Email"
              type="email"
              fullWidth
              sx={{mb: 2}}
              {...register("email", {
                required: "Required field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              autoFocus
            />

            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              sx={{mb: 2}}
              {...register('password', { required: true })}
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