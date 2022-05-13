const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(cors());
App.use(Express.static("public"));

// Sample GET route
App.get("/api/data", (req, res) => {
  console.log("GET /api/data");
  res.json({
    message: "Seems to work kinda!",
  });
});

App.post("/api/identify", async (req, res) => {
  await axios.post("https://api.plant.id/v2/identify", req.body)
  .then(res => {
    console.log('Success: ', res.data);
  }).catch(err => {
    console.log('Error: ', err);
  });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
