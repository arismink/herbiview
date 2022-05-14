import "../styles/Home.scss"

import { Button } from "@mui/material";

export default function Home({sendToPlantAPI, setFile}) {


  return (
    <div className="home-container">
      <div className="hero-container">
        <img src="/hero_image.jpeg" alt="hero" />
      </div>


      <div className="home-body">


        <div className="home-msg">
          <strong>Learn</strong> more about plants <br />by taking a <b>picture</b> of it.

        </div>

        <div>
          <form onSubmit={sendToPlantAPI}>
            <input type="file" onChange={setFile} />
            <Button variant="outlined" type="submit">Upload</Button>
          </form>

        </div>

      </div>

    </div>
  );
}
