import * as React from 'react';
import ReactDOM from 'react-dom';

import { Button, Paper } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme'

import { useState } from "react";
import axios from 'axios';
import './App.css';

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
    <ThemeProvider theme = { theme }>

      <div className="App">
        <Paper sx={{
          marginTop: '1rem',
          padding: '1rem'
        }}>
          <h1>{ state.message }</h1>
          <Button variant="contained" onClick={fetchData} >
            Fetch Data
          </Button>
      
          
        </Paper>
        
      </div>


    </ThemeProvider>

  );
}

export default App;
