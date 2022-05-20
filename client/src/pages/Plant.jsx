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

          <Typography variant="h4" margin={2} sx={{ textAlign: "center" }}>
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
        </Container>

        <Paper elevation={4}>

          <Typography variant="h6" padding={2} margin={2}>
            Family: {plant.family}
          </Typography>
          <StepConnector />
          <Typography variant="subtitle2" padding={2} margin={2}>
            <a href={plant.aspca_url}>Additional Info</a>
          </Typography>

        </Paper>
        <Box mb={5} />

          <Toxicity toxicities={plant.toxicities} />



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
