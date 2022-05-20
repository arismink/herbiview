import { Container, Box, Typography, StepConnector } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faHorse, faCat, faDog, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function Toxicity({ toxicities }) {
  console.log('dammit', toxicities);

  if (toxicities.length > 0) {
    return (
      <Container>
        <Container align="center">

          <Typography paddingTop={5} variant="h4" margin={2} sx={{ textAlign: "center" }}>
              Animal Toxicity
          </Typography>

          <Typography
            variant="subtitle2"
            margin={2}
            sx={{ textAlign: "center", color: "text.secondary" }}
          >
            <i>It may be dangerous to the animals<br/>displayed below if consumed: </i>
          </Typography>

          <Box sx={{ flexDirection: "row", padding: 3}} align="center">
            <Typography component={'span'} variant="h1" sx={{ textAlign: "center" }}>


              {toxicities.map((obj, index) => {

                if (obj.animal === "horse" && obj.toxic === true) return (
                  <FontAwesomeIcon icon={faHorse} key={index} />
                  )

                else if (obj.animal === "cat" && obj.toxic === true ) return (
                  <FontAwesomeIcon icon={faCat} key={index} />

                  )

                else if (obj.animal === "dog" && obj.toxic === true) return (
                  <FontAwesomeIcon icon={faDog} key={index} />
                )
              })}
            </Typography>
          </Box>

          <Box mb={5} />

        </Container>
      <Container>
        <StepConnector />
          <Typography variant="body1" paddingY={4}>

            Fluff about its clinical_signs will be here

          </Typography>

      </Container>



    </Container>

    )
  }

  return (
  <Container sx={{ display: 'flex' }}>
  </Container>
  )
}