import { Routes, Route } from "react-router-dom";
import useAppData from "hooks/useAppData";

// import ScrollToTop from "react-scroll-to-top";

import Container from "@mui/material/Container";

import Nav from "components/Nav";
import Footer from "components/Footer";
import Home from "components/Home/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import UserSearchHistory from "pages/UserSearchHistory";
import ApiPlantDetails from "pages/ApiPlantDetails";
import Plant from "pages/Plant";
import ScrollToTop from "components/ScrollToTop";

function App() {

  const { state, setFile, sendToPlantAPI } = useAppData();

  return (
    <div className="App">
      <Nav />
      <ScrollToTop />
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
          <Route path="/search-history" element={<UserSearchHistory />} />
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
