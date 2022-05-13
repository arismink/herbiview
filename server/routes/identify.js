const router = require("express").Router();
const axios = require("axios");

module.exports = () => {
  router.post("/", async (req, res) => {
    const base64file = req.body.base64file;
    const baseData = {
      images: [base64file],
      // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
    };

    const plantData = {
      ...baseData,
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };

    const healthData = {
      ...baseData,
      disease_details: [
        "cause",
        "common_names",
        "classification",
        "description",
        "treatment",
        "url",
      ],
    };

    const config = {
      headers: {
        "Api-Key": process.env.API_KEY,
      },
    };

    const identifyApiCall = axios.post(
      "https://api.plant.id/v2/identify",
      plantData,
      config
    );

    const healthApiCall = axios.post(
      "https://api.plant.id/v2/health_assessment",
      healthData,
      config
    );

    try {
      const [identifyResponse, healthResponse] = await Promise.all([
        identifyApiCall,
        healthApiCall,
      ]);

      res.send({
        identify: identifyResponse.data,
        health: healthResponse.data,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  });
  return router;
};
