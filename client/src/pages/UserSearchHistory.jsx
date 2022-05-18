import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';

export default function UserSearchHistory({ auth, user }) {
  const [ queries, setQueries ] = useState([]);

  useEffect(() => {
    if (user) {
      // GET user history
      // const email = user.email;
      const id = user.id;
      axios
        .post('/api/userHistory', { id })
        .then(response => {
          console.log("User history response", response.data.user_history);
          // const userHistoryArray = response.data.user_history.map(
          //   query => Object.entries(query)
          // );
          // setQueryList(userHistoryArray);
          setQueries(response.data.user_history);
          // console.log(`Query list is:`, queries);
        });
    }
  }, []);

  // Redirect to login page if not logged in
  if (!auth || !user) {
    return <Navigate replace to="/login" />
  }

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "sci_name", headerName: "Scientific Name", flex: 1 },
    // { field: "description", headerName: "Description", flex: 1, renderCell: (params) => {
    //   return (
    //     <Accordion>
    //       <AccordionSummary>
    //         Description:
    //       </AccordionSummary>
    //       <AccordionDetails>
    //         <Typography variant="body1" gutterBottom >{params.row.description}</Typography>
    //       </AccordionDetails>
    //     </Accordion>
    //   )
    // }},
    { field: "info_url", headerName: "Info", renderCell: (params) => {
      return(
        <a href={params.row.info_url}>More info</a>
      )
    }},
    { field: "aspca_url", headerName: "ASPCA Image", flex: 1, minHeight: 100, minWidth: 150, renderCell: (params) => {
      return (
        <div class="img-box">
          <img 
            src={params.row.aspca_url} 
            alt={"ASPCA image " + params.row.name}  
            style={{'max-width': '100%', 'max-height': '100%'}} 
            loading="lazy"
          />
        </div>
      )
    }},
    { field: "user_img_url", headerName: "Image", flex: 1, minHeight: 100, minWidth: 150, renderCell: (params) => {
      return (
        <div class="img-box">
          <img 
            src={params.row.user_img_url} 
            alt={"User uploaded image " + params.row.name}  
            style={{'max-width': '100%', 'max-height': '100%'}} 
            loading="lazy"
          />
        </div>
      )
    }},
    // { field: "common_names", headerName: "Other Common Names", flex: 2 },
    { field: "date", headerName: "Query Date", flex: 1, renderCell: (params) => {
      const dateOnly = params.row.date.split('T')[0];
      return (
        <Typography variant="body1">
          {dateOnly}
        </Typography>
      )
    }}
  ];

  return (
    <Container
    // sx={{marginTop: 20}}
    >
      <div>
        <Typography variant="h4" margin={2}>Search History for {user && user.name}: {user && user.email}</Typography>
      </div>
      <DataGrid 
        rows={queries} 
        columns={columns} 
        autoHeight 
        density='comfortable'
        initialState={{
          sorting: {
            sortModel: [{ field: 'date', sort: 'desc' }],
          },
        }}
      />

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