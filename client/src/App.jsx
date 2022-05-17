import { Routes, Route } from "react-router-dom";
import useAppData from "hooks/useAppData";

import Container from "@mui/material/Container";

import { useContext } from 'react';
import { authContext } from 'providers/AuthProvider';

import Nav from "components/Nav";
import Footer from "components/Footer";
import Home from "components/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import PlantDetailPage from "pages/PlantDetailPage";
import UserSearchHistory from "pages/UserSearchHistory";

function App() {
  // use auth context given by providers/AuthProvider.js
  const { auth, user } = useContext(authContext);

  const { state, setFile, sendToPlantAPI } = useAppData();

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
          <Route path="/search-history" element={<UserSearchHistory auth={auth} user={user} />} />
        </Routes>
      </Container>

      <Footer />
    </div>
  );
}

export default App;