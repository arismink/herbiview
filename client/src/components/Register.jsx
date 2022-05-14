import { useForm } from "react-hook-form"

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button } from "@mui/material";

export default function Register() {
  const { register, handleSubmit } = useForm();


  return (
<Container maxWidth="md">
      <h2>Register</h2>

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
              sx={{mb: 2}}
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              sx={{mb: 2}}
            />

          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{mb: 4}}>Login</Button>

        </form>

       </Container>

    </Container>
  )
};