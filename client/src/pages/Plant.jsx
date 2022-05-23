import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import usePlantData from 'hooks/plantData';

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Container,
  CircularProgress,
  Paper,
  StepConnector
} from "@mui/material";

import Toxicity from "components/Toxicity";

import "../styles/PlantDetails.scss";


export default function Plant() {
  const [plant, setPlant] = useState(null);

  const params = useParams();

  const { getPlantData } = usePlantData();

  useEffect(() => {
    getPlantData(params.plantId)
    .then((res) => {
      setPlant(res.data)
    })
  }, [params.plantId])


  if (plant) {

    return (
      <Container sx={{ width: { md: 800 } }}>
        <Box mt={2} />
        <Container sx={{ textAlign: "center" }}>
          <div className="plant-img-container">
            <img src={plant.image_url} alt={"plant_image"} />
          </div>

        </Container>

          <Typography paddingTop={4} variant="h4" margin={2} sx={{ textAlign: "center" }}>
            {plant.name}
          </Typography>
          <Typography
            variant="subtitle2"
            margin={2}
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            <i>
              {plant.sci_name}
            </i>
          </Typography>

          <Accordion
            elevation={3}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  Details
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Learn more about this plant
                </Typography>
              </AccordionSummary>
              <AccordionDetails>

                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Family:
                </Typography>
                {plant.family} <br /><br />

                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Common names:

                </Typography>

                  {plant.common_names}<br /><br />
                <StepConnector />
                <br />
                <Typography sx={{ color: "text.secondary" }}>
                  Additional Information:
                  <br />
                </Typography>
                <a href={plant.aspca_url} target="_blank" rel="noopener noreferrer">
                  {plant.aspca_url}
                </a>
              </AccordionDetails>
            </Accordion>

        <Box mb={5} />
        <Paper elevation={4}>
          <Toxicity toxicities={plant.toxicities} />

        </Paper>

        <Box mb={15} />


      </Container>
    );

  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )

}
