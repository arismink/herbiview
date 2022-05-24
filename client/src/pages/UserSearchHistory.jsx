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

  // Set up states to handle user queries and desktop
  const [ queries, setQueries ] = useState([]);
  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  useEffect(() => {
    if (user) {
      // GET user history
      const userid = user.id;
      axios
        .get(`/api/userHistory/${userid}`)
        .then(response => {
          console.log("User history is:", response.data.user_history);
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
              {row.name ? (
                row.name
              ) : (
                JSON.parse(row.common_names.replace(/{(.*)}/, '[$1]'))[0]
              )}
            </Typography>
          </TableCell>
          <>
            {isDesktop ? (
              <>
                <TableCell>
                  <Typography variant="body1">
                    {row.sci_name}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    <a 
                      href={row.info_url} 
                      target="_blank" 
                      rel="noreferrer"
                    >More info</a>
                  </Typography>
                </TableCell>
              </>
            ) : (
              <></>
            )}
          </>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="more-data">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Uploaded Image</TableCell>
                      <>
                        {isDesktop ? (
                          <TableCell align="center">Query Date</TableCell>
                        ) : (
                          <></>
                        )}
                      </>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
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
                      <>
                        {isDesktop ? (
                          <TableCell align="center">
                            <Typography variant="body1">
                              {row.date.split('T')[0]}
                            </Typography>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </>
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

  // If logged in and queries exist, show queries
  if (user && queries.length) {
    return (
      <Container>
        <div>
          <Typography variant="h4" paddingTop={8} paddingBottom={4}>Search History for {user && user.name}</Typography>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="Search History" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell >Name</TableCell>
                  <>
                    {isDesktop ? (
                      <>
                        <TableCell >Scientific Name</TableCell>
                        <TableCell align="center">Link to Info</TableCell>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
  else if (user) {
    return (
      <Container>
        <div>
          <Typography variant="h4" margin={6}>Search History for {user && user.name}</Typography>
        </div>
        <div>
          <Typography variant="body1" margin={6}>No queries found. Upload a plant photo to make a search!</Typography>
        </div>
      </Container>
    );
  }
  // If not logged in, prompt to login
  return (
    <Container>
      <div>
        <Typography variant="h4" margin={6}>Please <a href="/login">login</a> to view your search history.</Typography>
      </div>
    </Container>
  );
}
