import { useState } from 'react';
import { Button } from "@mui/material";

import "../../styles/Loading.scss";

export default function Loading({sendToPlantAPI, setFile}) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = function(e) {
    setIsLoading(true);
    sendToPlantAPI(e)
      // .then(plantResponse => setIsLoading(false))
      .catch(err => {
        console.err(err.message);
        setErrorMessage("Error when uploading image. Please try again.");
        setIsLoading(false);
      });
  };
  // If currently loading, show spinner
  if (isLoading) {
    return (
      <div className="upload-spinner">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  return (
      <div className="upload">
        {errorMessage && <div className="error">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={setFile} />
          <Button
            variant="contained"
            type="submit"
            disabled={isLoading}
          >Upload</Button>
        </form>
      </div>
  );

}