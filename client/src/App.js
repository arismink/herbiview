import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {

  const fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  return (
    <div className="App">
      <h1>{ this.state.message }</h1>
      <button onClick={this.fetchData} >
        Fetch Data
      </button>        
    </div>
  );
}

export default App;
