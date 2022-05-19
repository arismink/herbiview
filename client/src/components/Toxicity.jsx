import { Box, Typography, CircularProgress } from "@mui/material";

export default function Toxicity({props}) {
  console.log('dammit', props);

  if (props) {
    return (
      <Box>
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
            {props.toxicities.map((obj, index) => {
              return (
                <Box key={index}>
                  {obj.animal} and {String(obj.toxic)}
                </Box>
              );
            })}
          </Typography>


      </Box>

    )
  }

  return (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
  )
}