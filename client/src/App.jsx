import './App.css';
import useAppData from 'hooks/useAppData';

import Nav from './components/Nav';
import Footer from './components/Footer';


function App() {
  const { setFile, sendToPlantAPI } = useAppData();

  return (

    <div className="App">
      
      <Nav />

      <h1>Herbiview</h1>
      <form onSubmit={sendToPlantAPI}>
        <input type='file' onChange={setFile} />
        <button type='submit'>Upload</button>
      </form> 

      <Footer />

    </div>


  );
}

export default App;
