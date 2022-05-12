import { useState, useEffect } from "react";
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
      console.log("Entire response: ", response.data) // The entire response from the Express server

      console.log("Response message: ",response.data.message) // Just the message
      setState({
        message: response.data.message
      });
    }) 
  };

  return (
    <div className="App">
      <h1>{ state.message }</h1>
      <button onClick={fetchData} >
        Fetch Data
      </button>        
    </div>
  );
}

export default App;
