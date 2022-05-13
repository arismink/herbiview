import './App.css';
import useAppData from 'hooks/useAppData';

import Container from '@mui/material/Container';

import Nav from './components/Nav';
import Footer from './components/Footer';


function App() {
  const { handleChange, handleSubmit } = useAppData();

  return (

    <div className="App">
      
      <Nav />
      <Container sx={{marginY: 20}}>

        <h1>Herbiview</h1>
        <form onSubmit={handleSubmit}>
          <input type='file' onChange={handleChange} />
          <button type='submit'>Upload</button>
        </form> 

      </Container>

      <Footer />

    </div>


  );
}

export default App;
