import * as React from 'react';

import './App.css';
import useAppData from './hooks/useAppData';

import Nav from './components/Nav';
import Footer from './components/Footer';


function App() {
  const { handleChange, handleSubmit } = useAppData();

  return (

    <div className="App">
      <Nav />
      <h1>Herbiview</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleChange} />
        <button type='submit'>Upload</button>
      </form> 

      <Footer />

    </div>


  );
}

export default App;
