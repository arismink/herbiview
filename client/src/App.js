import './App.css';
import useAppData from 'hooks/useAppData';

function App() {
  const { handleChange, handleSubmit } = useAppData();

  return (
    <div className="App">
      <h1>Herbiview</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleChange} />
        <button type='submit'>Upload</button>
      </form> 
    </div>
  );
}

export default App;
