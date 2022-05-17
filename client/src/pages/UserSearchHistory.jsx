import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { Container, Button, Typography } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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
    { field: "description", headerName: "Description", flex: 1, renderCell: (params) => {
      return (
        <Accordion>
          <AccordionSummary>
            Description:
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" gutterBottom >{params.row.description}</Typography>
          </AccordionDetails>
        </Accordion>
      )
    }},
    { field: "info_url", headerName: "Info", flex: 1, renderCell: (params) => {
      return(
        <a href={params.row.info_url}>More info</a>
      )
    }},
    { field: "aspca_url", headerName: "ASPCA Image", minWidth: 150, renderCell: (params) => {
      return (
        <div>
          <img 
            src={params.row.aspca_url} 
            alt={params.row.name}  
            style={{'max-width': '100%', 'max-height': '100%'}} 
            loading="lazy"
          />
        </div>
      )
    }},
    // { field: "user_img_url", headerName: "Image", flex: 1 },
    { field: "common_names", headerName: "Other Common Names", flex: 1 },
    { field: "date", headerName: "Query Date, flex: 1" }
  ];

  const rows = function() {
    console.log("Queries for rows", JSON.stringify(queries));
    return queries;
  }

  // const rows = [
  //   {"id":453,"user_id":1,"plant_id":453,
  //   "sci_name":"Cucurbita maxima var. hubbard",
  //   "description":"Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
  //   "info_url":"http://typepad.com/laoreet/ut/rhoncus/aliquet/pulvinar/sed/nisl.png",
  //   "user_img_url":"http://dummyimage.com/116x100.png/dddddd/000000",
  //   "common_names":"","date":"2021-07-21T00:00:00.000Z",
  //   "name":"Hubbard Squash",
  //   "email":"wmccarron0@cloudflare.com",
  //   "password_digest":"voFPJ9dsxi",
  //   "family":"Cucurbitaceae",
  //   "aspca_url":"https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/field/image/plants/hubbard-squash-r.jpg?itok=7w-51Ewe",
  //   "image_url":"https://www.aspca.org//pet-care/animal-poison-control/toxic-and-non-toxic-plants/hubbard-squash"
  // },{"id":822,"user_id":1,"plant_id":822,"sci_name":"Cryptanthus lacerdae","description":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.","info_url":"http://soundcloud.com/quisque/erat/eros/viverra/eget/congue.aspx","user_img_url":"http://dummyimage.com/108x100.png/dddddd/000000","common_names":"Cape Marigold","date":"2021-10-22T00:00:00.000Z","name":"Silver Star","email":"wmccarron0@cloudflare.com","password_digest":"voFPJ9dsxi","family":"Bromeliaceae","aspca_url":"https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/default_images/imageunavailable_0.jpg?itok=JCCt_uvE","image_url":"https://www.aspca.org//pet-care/animal-poison-control/toxic-and-non-toxic-plants/silver-star"},{"id":459,"user_id":1,"plant_id":459,"sci_name":"Adenium obesum","description":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.","info_url":"https://nifty.com/suspendisse/potenti/cras/in.aspx","user_img_url":"http://dummyimage.com/213x100.png/dddddd/000000","common_names":"Desert Rose, Mock Azalea, Sabi Star, Desert Azalea, Kudu Lily","date":"2022-01-27T00:00:00.000Z","name":"Impala Lily","email":"wmccarron0@cloudflare.com","password_digest":"voFPJ9dsxi","family":"Apocynaceae","aspca_url":"https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/default_images/imageunavailable_0.jpg?itok=JCCt_uvE","image_url":"https://www.aspca.org//pet-care/animal-poison-control/toxic-and-non-toxic-plants/impala-lily"}];

  return (
    <Container
    // sx={{marginTop: 20}}
    >
      <div>
        <Typography variant="h4" margin={2}>Search History for {user && user.name}: {user && user.email}</Typography>
      </div>
      <DataGrid rows={queries} columns={columns} autoHeight />

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