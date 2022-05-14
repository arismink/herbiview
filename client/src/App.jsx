import { Routes, Route } from "react-router-dom";
import "./App.css";
import useAppData from "hooks/useAppData";

import Container from "@mui/material/Container";

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "components/Home";
import Login from "components/Login";
import Register from "components/Register";

function App() {
  const { setFile, sendToPlantAPI } = useAppData();

  return (
    <div className="App">
      <Nav />
      <Container sx={{ marginY: 20 }}>
        <Routes>
          <Route
            path="/"
            element={<Home sendToPlantAPI={sendToPlantAPI} setFile={setFile} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


        </Routes>
      </Container>

      <Footer />
    </div>
  );
}

export default App;
