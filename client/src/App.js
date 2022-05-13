import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function App() {
  // Set up state information
  const [state, setState] = useState({
    message: "No message for now."
  });

  const [selectedImage, setSelectedImage] = useState(null);

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
      <h1>Image</h1>
      {selectedImage && (
        <div>
        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
        <br />
        <button onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
}

export default App;
