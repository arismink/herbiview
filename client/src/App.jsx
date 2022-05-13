import * as React from 'react';
import ReactDOM from 'react-dom';

import { Button, Typography } from '@mui/material';

import { useState } from "react";
import axios from 'axios';
import './App.css';


import Nav from './components/Nav';
import Footer from './components/Footer';


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

    <div className="App">
      <Nav />

        <Typography variant="h1">{ state.message }</Typography>
        <Button variant="contained" onClick={fetchData} >
          Fetch Data!
        </Button>
    
      
      <Footer />
    </div>


  );
}

export default App;
