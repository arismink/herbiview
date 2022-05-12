import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import { convertImageToBase64 } from './helpers/fileReader.js'

function App() {
  // Set up state information
  const [state, setState] = useState({
    message: "No message for now."
  });
  const [file, setFile] = useState();

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

  const handleSubmit = (e) => {
    e.preventDefault()
    convertImageToBase64(file).then(base64file => {
      console.log(base64file)
      const data = {
        api_key: "-- ask for one: https://web.plant.id/api-access-request/ --",
        image: base64file,
        // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
        plant_details: ["common_names",
                        "url",
                        "name_authority",
                        "wiki_description",
                        "taxonomy",
                        "synonyms"],
      };
      
      axios('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  }

  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div className="App">
      <h1>{ state.message }</h1>
      <button onClick={fetchData} >
        Fetch Data
      </button>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleChange} />
        <button type='submit'>Upload</button>
      </form> 
    </div>
  );
}

export default App;
