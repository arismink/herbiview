import { Container, Box, Typography, CircularProgress } from "@mui/material";

export default function Toxicity({ toxicities }) {
  console.log('dammit', toxicities);

  if (toxicities.length > 0) {
    return (
      <Container>

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
          {toxicities.map((obj, index) => {
            return (
              <Box key={index}>
                {obj.animal} and {String(obj.toxic)}
              </Box>
            );
          })}
        </Typography>

    </Container>
    )
  }

  return (
  <Container sx={{ display: 'flex' }}>
  </Container>
  )
}