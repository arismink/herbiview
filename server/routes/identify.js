const router = require("express").Router();
const axios = require("axios");

module.exports = () => {
  router.post("/", async (req, res) => {
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

    let result = {};
    await axios
      .post("https://api.plant.id/v2/identify", data, config)
      .then((res) => {
        console.log("Success: ", res.data);
        result = res.data;
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    res.send(result);
  });
  return router;
};
