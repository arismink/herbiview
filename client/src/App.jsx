import * as React from 'react';
import ReactDOM from 'react-dom';

import { Button, Paper, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvira } from '@fortawesome/free-brands-svg-icons'

import Theme from './styles/Theme';

import { useState } from "react";
import axios from 'axios';
import './App.css';


import Nav from './components/Nav';

function App() {
  // Set up state information
  const [state, setState] = useState({
    message: "No message for now."
  });

  // useEffect(() => {

  // }, []);

  const fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      setState({
        message: response.data.message
      });
    }) 
  };

  return (
    <ThemeProvider theme = { Theme }>

      <div className="App">
        <Nav />
        
          <Typography variant="h1">{ state.message }</Typography>
          <Button variant="contained" onClick={fetchData} >
          <FontAwesomeIcon icon={faEnvira} />
          </Button>
      
        
      </div>


    </ThemeProvider>

  );
}

export default App;
