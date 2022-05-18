import { useEffect, useState, useCallback } from 'react';
// import { Navigate } from 'react-router-dom'
import axios from 'axios';

import { useContext } from 'react';
import { authContext } from 'providers/AuthProvider';

// import Box from '@mui/material/Box';
import { Container, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';


export default function UserSearchHistory() {
  // use auth context given by providers/AuthProvider.js
  const { user } = useContext(authContext);

  const [ queries, setQueries ] = useState([]);

  useEffect(() => {
    if (user) {
      // GET user history
      const id = user.id;
      axios
        .post('/api/userHistory', { id })
        .then(response => {
          // console.log("User history response", response.data.user_history);
          setQueries(response.data.user_history);
        });
    }
  }, [user]);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "sci_name", headerName: "Scientific Name", flex: 1 },
    { field: "info_url", headerName: "Info", renderCell: (params) => {
      return(
        <a href={params.row.info_url} target="_blank" rel="noreferrer">More info</a>
      )
    }},
    { field: "aspca_url", headerName: "ASPCA Image", flex: 1, minHeight: 100, minWidth: 150, renderCell: (params) => {
      return (
        <div className="img-box">
          <img 
            src={params.row.aspca_url} 
            alt={"ASPCA image " + params.row.name}  
            style={{'maxWidth': '100%', 'maxHeight': '100%'}} 
            loading="lazy"
          />
        </div>
      )
    }},
    { field: "user_img_url", headerName: "Image", flex: 1, minHeight: 100, minWidth: 150, renderCell: (params) => {
      return (
        <div className="img-box">
          <img 
            src={params.row.user_img_url} 
            alt={"User uploaded image " + params.row.name}  
            style={{'maxWidth': '100%', 'maxHeight': '100%'}} 
            loading="lazy"
          />
        </div>
      )
    }},
    { field: "date", headerName: "Query Date", flex: 1, renderCell: (params) => {
      const dateOnly = params.row.date.split('T')[0];
      return (
        <Typography variant="body1">
          {dateOnly}
        </Typography>
      )
    }}
  ];

  const handleGetRowHeight = useCallback(() => {
    return 100;
  }, []);

  if (queries.length) {
    return (
      <Container>
        <div>
          <Typography variant="h4" margin={6}>Search History for {user && user.name}: {user && user.email}</Typography>
        </div>
        <DataGrid 
          rows={queries} 
          columns={columns} 
          autoHeight 
          // rowHeight={100}
          // getRowHeight={handleGetRowHeight}
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
  // If no queries, prompt to login
  return (
    <Container>
      <div>
        <Typography variant="h4" margin={6}>Please <a href="/login">login</a> to view your search history.</Typography>
      </div>
    </Container>
  );
}
