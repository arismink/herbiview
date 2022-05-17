import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function UserSearchHistory({ auth, user }) {
  const [ queries, setQueries ] = useState([]);

  useEffect(() => {
    if (user) {
      // GET user history
      const email = user.email;
      axios
        .post('/api/userHistory', { email })
        .then(response => {
          // console.log("User history response", response.data.user_history);
          // const userHistoryArray = response.data.user_history.map(
          //   query => Object.entries(query)
          // );
          // setQueryList(userHistoryArray);
          setQueries(response.data.user_history);
          console.log(`Query list is:`, queries);
        });
    }
  }, [user]);

  // Redirect to login page if not logged in
  if (!auth || !user) {
    return <Navigate replace to="/login" />
  }

  const columns = [
    { field: "name", headerName: "Name" },
    { field: "sci_name", headerName: "Scientific Name" },
    { field: "description", headerName: "Description" },
    { field: "info_url", headerName: "Information URL" },
    { field: "user_img_url", headerName: "Image URL" },
    { field: "common_names", headerName: "Other Common Names" },
    { field: "date", headerName: "Query Date" }
  ];

  return (
    <Container
    // sx={{marginTop: 20}}
    >
      <div>
        <Typography variant="h4" margin={2}>Search History for {user && user.name}: {user && user.email}</Typography>
      </div>
      <DataGrid rows={queries} columns={columns} />

    </Container>

  );
}

/*
{
  "id":1,
  "user_id":59,
  "plant_id":936,
  "sci_name":"Clematis sp.",
  "description":"Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
  "info_url":"https://wikimedia.org/eget/nunc/donec/quis.aspx",
  "user_img_url":"http://dummyimage.com/144x100.png/cc0000/ffffff",
  "common_names":"Virgin's Bower",
  "date":"2021-12-25T00:00:00.000Z"
}
*/