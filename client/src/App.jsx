import { Routes, Route } from "react-router-dom";
import useAppData from "hooks/useAppData";

import Container from "@mui/material/Container";

import Nav from "components/Nav";
import Footer from "components/Footer";
import Home from "components/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import ApiPlantDetails from "pages/ApiPlantDetails";
import Plant from "pages/Plant";

function App() {
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

          <Route
            path="/plant-details"
            element={
              <ApiPlantDetails data={state.data} toxicity={state.toxicity} />
            }
          />


          <Route path="/plants/:plantId" element={<Plant />} />

        </Routes>
      </Container>

      <Footer />
    </div>
  );
}

export default App;
