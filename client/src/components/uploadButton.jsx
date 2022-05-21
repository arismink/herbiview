import { Typography, Box } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faImage } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

export function UploadButton() {
  const [show, setShow] = useState(false);

  return (
    <Box sx={{alignItems: "center"}}>
      <Typography component={"span"} sx={{textAlign: "center"}} onClick={() => setShow(true) }>
        <FontAwesomeIcon icon={faImage} size="4x" /><br/>
        UPLOAD AN<br/> IMAGE</Typography>
    </Box>
  )
};