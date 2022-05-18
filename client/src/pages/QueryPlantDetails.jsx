import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomizedProgressBars from "components/ProbabilityBar";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  Container,
  Stack,
} from "@mui/material";

import "../styles/PlantDetails.scss";

const data = {
  "id": 181,
  "name": "Ceriman",
  "sci_name": "Monstera deliciosa",
  "common_names": "Cutleaf Philodendron, Hurricane Plant, Swiss Cheese Plant, Mexican Breadfruit",
  "family": "Araceae",
  "aspca_url": "https://www.aspca.org/sites/default/files/styles/medium_image_300x200/public/field/image/plants/ceriman-cutleaf-philodendron-r.jpg?itok=qYgFKKCu",
  "image_url": "https://www.aspca.org//pet-care/animal-poison-control/toxic-and-non-toxic-plants/ceriman",
  "toxicities": [
    {
    "animal": "cat",
    "toxic": true
    },
    {
    "animal": "dog",
    "toxic": true
    },
    {
    "animal": "horse",
    "toxic": true
    }
  ]
}

export default function QueryPlantDetails() {

  return (
    <Container sx={{ width: { md: 800 } }}>
      <Box mt={2} />
      <Container sx={{ textAlign: "center" }}>
        <div className="plant-img-container">
          <img src={data.aspca_url} alt={"plant_image"} />
        </div>

        <Typography variant="h4" margin={2} sx={{ textAlign: "center" }}>
          {data.name}
        </Typography>
        <Typography
          variant="subtitle2"
          margin={2}
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          <i>
            {data.sci_name}
          </i>
        </Typography>
      </Container>

      <Typography variant="h6" margin={2} sx={{ textAlign: "center" }}>
        Family: {data.family}
      </Typography>

      <Typography variant="h6" margin={2} sx={{ textAlign: "center" }}>
        Additional info: {data.image_url}
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
        {data.toxicities.map((obj, index) => {
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
