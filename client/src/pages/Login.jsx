import { useContext, useState } from 'react';
import { authContext } from 'providers/AuthProvider';

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import "../styles/Login.scss";

export default function Login() {
  // use auth context given by providers/AuthProvider.js
  const { loginHandler } = useContext(authContext);

  // set up error message state
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // register lets you register an input and apply validation rules on it
  const { register, handleSubmit } = useForm();

  // function handle login data
  const handleLogin = data => {
    loginHandler(data)
    .then((res) => {
      if (res) {
        console.log("email and password verified");
        setError("");
        navigate("/");
      } else {
        console.log("email and password could not be verified.");
        setError("Email and password combination could not be verified.");
      }
    })
    .catch(err => {
      console.log('login error:', err)
    })
  };

  const onErrors = errors => {
    console.error(errors);
  };

  return (
    <Container
      sx={{mt: 5,
      textAlign: "center"}}
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

        {error && <div className="error">{error}</div>}

        <Link to="/register">Don't have an account? Register here</Link>

      </Container>

    </Container>
  );
}