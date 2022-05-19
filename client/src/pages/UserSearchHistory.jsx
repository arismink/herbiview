import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import { useContext } from 'react';
import { authContext } from 'providers/AuthProvider';

import { Container, Typography, Paper } from "@mui/material";
import { Box, Collapse, IconButton } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import "../styles/UserSearchHistory.scss"

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
          setQueries(response.data.user_history);
        });
    }
  }, [user]);

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
  
    return (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            <Typography variant="h6">
              {row.name}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              {row.sci_name}
            </Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="body1">
              <a href={row.info_url} target="_blank" rel="noreferrer">More info</a>
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/* <Typography variant="h6" gutterBottom component="div">
                  Additional Data
                </Typography> */}
                <Table size="small" aria-label="more-data">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ASPCA Image</TableCell>
                      <TableCell align="center">Uploaded Image</TableCell>
                      <TableCell align="center">Query Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={row.date}>
                      <TableCell align="center">
                        <div className="img-box">
                          <img 
                            src={row.image_url} 
                            alt={`ASPCA pic: ${row.name}`}   
                            style={{'maxWidth': '100%', 'maxHeight': '100%'}} 
                            loading="lazy"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <div className="img-box">
                          <img 
                            src={row.user_img_url} 
                            alt={`User uploaded: ${row.name}`}  
                            style={{'maxWidth': '100%', 'maxHeight': '100%'}} 
                            loading="lazy"
                          />
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body1">
                          {row.date.split('T')[0]}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  if (queries.length) {
    return (
      <Container>
        <div>
          <Typography variant="h4" margin={6}>Search History for {user && user.name}: {user && user.email}</Typography>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="Search History" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Scientific Name</TableCell>
                <TableCell align="center">Link to Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
