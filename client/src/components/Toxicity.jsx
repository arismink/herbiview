import { Container, Box, Typography, StepConnector } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHorse, faCat, faDog, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function Toxicity({ toxicities }) {
  console.log('dammit', toxicities);

  if (toxicities.length > 0) {
    return (
      <Container>

      <Typography paddingTop={5} variant="h4" margin={2} sx={{ textAlign: "center" }}>
          Animal Toxicity
        </Typography>
        <Typography
          variant="subtitle2"
          margin={2}
          sx={{ textAlign: "center", color: "text.secondary" }}
        >
          <i>Will it harm your cat, dog or horse?</i>
        </Typography>

        <Typography variant="h1" sx={{ textAlign: "center" }}>

          <Box sx={{ flexDirection: "row", padding: 3}}>

            {toxicities.map((obj) => {

              if (obj.animal === "horse") return (
                <>
                  <FontAwesomeIcon icon={faHorse} /> <FontAwesomeIcon icon={faCircleExclamation} size="xs" />
                </>)

              else if (obj.animal === "cat") return (
                <>
                  <FontAwesomeIcon icon={faCat} />
                  <FontAwesomeIcon icon={faCircleExclamation} size="xs" />
                </>)

              else if (obj.animal === "dog") return (
              <>
                <FontAwesomeIcon icon={faDog} />
                <FontAwesomeIcon icon={faCircleExclamation} size="xs" />
              </>)

            })}
          </Box>
        </Typography>

        <Box mb={5} />

        <StepConnector />
          <Typography variant="body1" paddingY={4}>

            Fluff about its clinical_signs will be here

          </Typography>


    </Container>
    )
  }

  return (
  <Container sx={{ display: 'flex' }}>
  </Container>
  )
}