import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Login() {

  const { register, handleSubmit } = useForm();

  // function handle login data
  const handleLogin = data => console.log(data);

  const onErrors = errors => console.error(errors)

  return (
    <Container maxWidth="md">

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
              sx={{mb: 1}}
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
              sx={{mb: 1}}
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