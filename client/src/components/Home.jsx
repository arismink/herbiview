import "../styles/Home.scss"
import { Box } from "@mui/system";

import { Typography, StepConnector } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faImage } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import Loading from "components/Loading";

export default function Home({sendToPlantAPI, setFile}) {

  const [show, setShow] = useState(false);

  return (
    <div className="home-container">
      <div className="hero-container">
        <img src="/hero_image.jpeg" alt="hero" />
      </div>


      <div className="home-body">


        <div className="home-msg">
          <Box mb={25} sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block'}}} />
          <strong>Learn</strong> more about plants <br />by taking a <b>picture</b> of it.



        </div>

        { show ? <Loading sendToPlantAPI={sendToPlantAPI} setFile={setFile}/> :
          <Box onClick={() => setShow(true) }>
            <StepConnector/>
            <br/>
            <Typography variant="body2" align="center">
            <FontAwesomeIcon icon={faImage} size="3x" /> <br/><br/>
              UPLOAD AN<br/> IMAGE</Typography>
          </Box>
          }


      </div>

    </div>
  );
}
