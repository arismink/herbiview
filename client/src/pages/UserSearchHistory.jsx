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
    if (!auth || !user) {
      // Redirect to login page if not logged in
      return <Navigate replace to="/login" />
    } else {
      // GET user history
      const email = user && user.email;
      axios
        .post('/api/userHistory', { email })
        .then(response => {
          console.log("User history response", response.data.user_history);
          const userHistoryArray = response.data.user_history.map(
            query => Object.entries(query)
          );
          setQueryList(userHistoryArray);
        });
    }
  }, [auth, user]);


  return (
    <Container
    // sx={{marginTop: 20}}
    >
      <div>
        <Typography variant="h2" margin={2}>User: {user && user.name}, {user && user.email}</Typography>
      </div>
      {queryList}

    </Container>

  );
}
