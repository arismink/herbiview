import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";

export default function UserSearchHistory({ auth, user }) {
  console.log("USH Auth", auth);
  console.log("User", user);
  
  const [queryList, setQueryList] = useState([]);

  useEffect(() => {
    // Redirect to login page if not logged in
    if (!auth) {
      return <Navigate replace to="/login" />
    } else {
      const email = user && user.email;
      axios
        .get('/api/userHistory', { data: email })
        .then(response => {
          console.log(response.data.user_history);
          setQueryList([...response.data.user_history]);
        });
    }
  }, [auth, user.email]);


  return (
    <Container
    // sx={{marginTop: 20}}
    >
      <div>
        <Typography variant="h2" margin={2}>User: {user.name}, {user.email}</Typography>
      </div>
      {queryList}

    </Container>

  );
}
