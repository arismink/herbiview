import { useForm } from "react-hook-form"

import { useEffect } from "react";

import axios from "axios";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function Register() {

  // register lets you register an input and apply validation rules on it
  const { register, handleSubmit } = useForm();

  // Handle registration with this function
  const handleRegistration = (data) => {
    console.log(data);

    return axios
      .post('/api/users/register', {
        name: data.name,
        email: data.email,
        password: data.password
      })
      .then(res => {
        console.log('res:', res);
        console.log(res.config.data);
        console.log(JSON.parse(res.config.data))
        console.log('type of:', typeof res.config.data)
      })

  };

  const onErrors = errors => console.error(errors);

  return (
    <Container
      sx={{mt: 5}}
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

            <form onSubmit={handleSubmit(handleRegistration, onErrors)}
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