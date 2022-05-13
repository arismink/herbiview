const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const PORT = 8080;

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json({ limit: "50mb" }));
App.use(cors());
App.use(Express.static("public"));

// Sample GET route
App.get("/api/data", (req, res) => {
  console.log("GET /api/data");
  res.json({
    message: "Seems to work kinda!",
  });
});

App.post("/api/identify", (req, res) => {
  const base64file = req.body.base64file;
  const data = {
    images: [base64file],
    // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
    modifiers: ["crops_fast", "similar_images"],
    plant_language: "en",
    // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
    plant_details: [
      "common_names",
      "url",
      "name_authority",
      "wiki_description",
      "taxonomy",
      "synonyms",
    ],
  };
  const config = {
    headers: {
      "Api-Key": process.env.API_KEY,
    },
  };
  axios
    .post("https://api.plant.id/v2/identify", data, config)
    .then((res) => {
      console.log("Success: ", res.data);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
