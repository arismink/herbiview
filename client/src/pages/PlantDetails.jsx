import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Container } from "@mui/material";

/*
data = {
  image_url: string,
  plant_name: string,
  common_names: array,
  info_url: string,
  description: string,
  sci_name: string,
  probablilty: int %,
  similar_images: array,

  healthy: boolean,
  healthy_probability: int %,
  disease_name: string,
  disease_probability: int %,
  disease_info_url: string,
  disease_prevention: string,
  disease_description: string
}
*/

export default function PlantDetail({ data }) {
  return (
    <Container
      sx={{
        width:{ md: 800 }
      }}
      style={{
        alignItems: "center"
      }}>
      <Container sx={{ textAlign: "center" }}>
        <Box marginY={2}>
          <img src={data.image_url} alt={"plant_image"} />
        </Box>

        <Typography variant="h4" margin={2} sx={{ textAlign: "center" }}>
          {data.plant_name}
        </Typography>
        <Typography>{data.probability}%</Typography>
      </Container>

      <Accordion>
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

      <Accordion>
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

      <Accordion>
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

      <Box mb={15} />
    </Container>
  );
}
