import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import usePlantData from 'hooks/plantData';

import {
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
        <Paper elevation={4}>
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


          <Typography variant="body1" padding={4}>
            Family: {plant.family}
          </Typography>
          <Box marginX={4}>
            <StepConnector />

          </Box>
          <Typography variant="body1" padding={4}>
            <a href={plant.aspca_url}>Additional Info</a>
          </Typography>

        </Paper>
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
