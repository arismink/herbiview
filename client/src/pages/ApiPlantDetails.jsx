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
  Paper,
} from "@mui/material";

import "../styles/PlantDetails.scss";

import Toxicity from "components/Toxicity";

/*
data = {
  image_url: string,
  plant_name: string,
  common_names: array,
  info_url: string,
  description: string,
  sci_name: string,
  suggestions: array[plant_name, probability],
  similar_images: array,
  edible: array

  healthy: boolean,
  healthy_probability: int %,
  disease_name: string,
  disease_probability: int %,
  disease_info_url: string,
  disease_prevention: string,
  disease_description: string
}
*/

export default function ApiPlantDetails({ data, toxicity }) {
  return (
    <Container sx={{ width: { md: 800 } }}>
      <Box mt={2} />
      <Container sx={{ textAlign: "center" }}>
        <div className="plant-img-container">
          <img src={data.image_url} alt={"plant_image"} />
        </div>

        <Typography variant="h4" margin={2} sx={{ textAlign: "center" }}>
          {data.plant_name}
        </Typography>
        <Typography
          variant="subtitle2"
          margin={2}
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          <i>{data.common_names && data.common_names.join(", ")}</i>
        </Typography>
      </Container>

      <Box margin={2} textAlign="center">
        <Typography variant="h6" sx={{ margin: "10px" }}>
          Similar Images
        </Typography>
        <Stack direction="row">
          <Container>
            {data.similar_images.map((img, index) => {
              return <img src={img} alt={"image " + index} key={index}/>;
            })}
          </Container>
        </Stack>
      </Box>

      <Accordion elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Probability
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            How sure are we?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={"span"}>
            {data.suggestions.map((el) => {
              return (
                <CustomizedProgressBars
                  key={el.key}
                  value={el.probability}
                  name={el.plant_name}
                />
              );
            })}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Description
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Learn more about this plant
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data.description}</Typography>
          <br />
          <Typography sx={{ color: "text.secondary" }}>
            Additional Information:
            <br />
          </Typography>
          <a href={data.info_url} target="_blank" rel="noopener noreferrer">
            {data.info_url}
          </a>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Edible</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Is it safe to eat?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {data.edible &&
              "Parts of the plant that are edible OR used in medicine."}
          </Typography>
          <br />
          <Typography>
            {data.edible
              ? data.edible.map((el, index) => {
                  return <li key={index}>{el}</li>;
                })
              : "No. Do not consume this plant. You will die."}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Box mb={10} />

      <Typography variant="h4" margin={2} sx={{ textAlign: "center" }}>
        Health Assessment
      </Typography>
      <Typography
        variant="subtitle2"
        margin={2}
        sx={{ textAlign: "center", color: "text.secondary" }}
      >
        <i>How healthy is this plant?</i>
      </Typography>

      <Typography variant="h6" sx={{ textAlign: "left" }}>
        Healthiness Probability:
      </Typography>

      <CustomizedProgressBars
        key={data.healthy_probability}
        value={data.healthy_probability}
      />

      <Typography variant="h6" sx={{ textAlign: "left" }} mt={2}>
        Disease Probability:
      </Typography>

      <CustomizedProgressBars
        key={data.disease_probability}
        value={data.disease_probability}
      />

      <Box mt={3} />
      <Accordion elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Possible Disease
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {data.disease_name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data.disease_description}</Typography>
          <br />
          <Typography sx={{ color: "text.secondary" }}>
            Additional Information:
            <br />
          </Typography>
          <a href={data.info_url} target="_blank" rel="noopener noreferrer">
            {data.disease_info_url}
          </a>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Remedy</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Prevention is key
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {data.disease_prevention && data.disease_prevention.join(" ")}
          </Typography>
          <br />
        </AccordionDetails>
      </Accordion>

      <Box mb={10} />
      <Paper elevation={4}>
        <Toxicity toxicities={toxicity} />
      </Paper>

      <Box mb={15} />
    </Container>
  );
}
