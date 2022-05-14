import "../styles/Home.scss"

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
            <button type="submit">Upload</button>
          </form>

        </div>

      </div>

    </div>
  );
}
