import { Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import "./App.css";
import useAppData from "hooks/useAppData";

import Container from "@mui/material/Container";

import Nav from "components/Nav";
import Footer from "components/Footer";
import Home from "components/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import PlantDetailPage from "pages/PlantDetailPage";

import { authContext } from 'providers/AuthProvider';

function App() {
  const { state, setFile, sendToPlantAPI } = useAppData();
  const { auth } = useContext(authContext);

  return (
    <div className="App">
      <Nav />
      <Container
        // sx={{marginTop: 20}}
      >
        <Routes>
          <Route
            path="/"
            element={<Home sendToPlantAPI={sendToPlantAPI} setFile={setFile} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          <Route path="/plant-details" element={<PlantDetailPage id={state.id} health={state.health} />} />
        </Routes>
      </Container>

      <Footer />
    </div>
  );
}

export default App;
