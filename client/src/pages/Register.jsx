import { useForm } from "react-hook-form"

import { useContext } from "react";
import { authContext } from "providers/AuthProvider";

import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function Register() {

  const navigate = useNavigate();

  const { registerHandler, user, auth } = useContext(authContext);
  // register lets you register an input and apply validation rules on it
  const { register, handleSubmit } = useForm();

  const handleRegister = (data) => {
    registerHandler(data)
    .then((res) => {
      if (user && auth) {
        console.log("email and password verified");
        navigate("/");
      } else {
        console.log("email and password could not be verified.")
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <Container
      sx={{mt: 5,
        textAlign: "center"}}
      maxWidth="md">

      <PersonAddAltIcon style={{ fontSize: 100, color: 'grey' }}/>
        <Typography variant="h4" margin={2}>Register</Typography>

          <Container
            sx={{
              width: 500,
              maxWidth: "100%",
              alignItems: "center",
            }}
            noValidate
            >

            <form onSubmit={handleSubmit(handleRegister)}
            autoComplete="off">

            <Box mb={2}>
            <TextField
                required
                id="outlined-name-input"
                label="Name"
                type="Name"
                fullWidth
                sx={{mb: 2}}
                autoFocus
                {...register('name', { required: true })}
              />

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
            sx={{mb: 4}}>Register</Button>

        </form>

      </Container>

    </Container>
  )
};