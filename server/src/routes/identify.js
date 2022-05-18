const router = require("express").Router();
const axios = require("axios");
const mockIdentifyData = require("../mockData/mockIdentifyData.json");
const mockHeathData = require("../mockData/mockHealthData.json");
const identifyData = require("../helpers/identifyData.js");
const healthData = require("../helpers/healthData.js");

module.exports = () => {
  router.post("/", async (req, res) => {
    const base64file = req.body.base64file;
    const baseParams = {
      images: [base64file],
      // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
    };

    const plantParams = {
      ...baseParams,
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };

    const healthParams = {
      ...baseParams,
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
      plantParams,
      config
    );

    const healthApiCall = axios.post(
      "https://api.plant.id/v2/health_assessment",
      healthParams,
      config
    );

    const useMockData = true;
    if (useMockData) {
      res.send({
        ...identifyData(mockIdentifyData),
        ...healthData(mockHeathData),
      });
    } else {
      try {
        const [identifyResponse, healthResponse] = await Promise.all([
          identifyApiCall,
          healthApiCall,
        ]);
        res.send({
          ...identifyData(identifyResponse.data),
          ...healthData(healthResponse.data),
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  });
  return router;
};
