import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import usePlantData from 'hooks/plantData';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Container,
  Stack,
  CircularProgress
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
            <img src={plant.aspca_url} alt={"plant_image"} />
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

        <Typography variant="h6" margin={2} sx={{ textAlign: "center" }}>
          Family: {plant.family}
        </Typography>

        <Typography variant="h6" margin={2} sx={{ textAlign: "center" }}>
          Additional info: {plant.image_url}
        </Typography>

        <Typography variant="h4" margin={2} sx={{ textAlign: "center" }}>
            Animal Toxicity
          </Typography>
          <Typography
            variant="subtitle2"
            margin={2}
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            <i>Will it harm your cat, dog or horse?</i>
          </Typography>

          <Typography component={"span"}>
            {plant.toxicities.map((obj, index) => {
              return (
                <Box key={index}>
                  {obj.animal} and {String(obj.toxic)}
                </Box>
              );
            })}
          </Typography>

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
