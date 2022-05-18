const router = require("express").Router();
const axios = require("axios");
const mockIdentifyData = require("../mockData/mockIdentifyData.json");
const mockHeathData = require("../mockData/mockHealthData.json");
const identifyData = require("../helpers/identifyData.js");
const healthData = require("../helpers/healthData.js");

module.exports = (db) => {
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

    const useMockData = false;
    if (useMockData) {
      res.send({
        ...identifyData(mockIdentifyData),
        ...healthData(mockHeathData)
      });
    } else {
      // Set up axios identify POST to plant.id
      const identifyApiCall = axios.post(
        "https://api.plant.id/v2/identify",
        plantParams,
        config
      );
      // Set up axios health POST to plant.id
      const healthApiCall = axios.post(
        "https://api.plant.id/v2/health_assessment",
        healthParams,
        config
      );
      // Do both POSTs to plant.id
      Promise.all([identifyApiCall, healthApiCall])
        .then(([identifyResponse, healthResponse]) => {
          const responseSend = {
            ...identifyData(identifyResponse.data),
            ...healthData(healthResponse.data),
          };
          // Set up axios query POST to db, to find plant id, and return along with responses
          return { 
            queryPlantID: db.query(`
              SELECT id FROM plants 
              WHERE LOWER(name) LIKE $1 OR 
                LOWER(sci_name) LIKE $1 OR 
                LOWER(common_names) LIKE $1
              LIMIT 1
            ;`), 
            responseSend 
          };
        })
        .then(({ queryPlantID, responseSend }) => {

          // Set up axios query POST to db, to insert query
          const querySaveDB = db.query(`
          INSERT INTO user_search_history
          (user_id, plant_id, sci_name, description, info_url, user_img_url, common_names, date) 
          VALUES (
            $1, $2, $3, $4, $5, $6, $7, $
            (SELECT sci_name FROM plants WHERE id = 936), 
            'Quisque porta volutpat erat. Nunc purus.', 
            'https://wikimedia.org/eget/nunc/donec/quis.aspx', 
            'http://dummyimage.com/144x100.png/cc0000/ffffff', 
            (SELECT name FROM plants WHERE id = 936), '12/25/2021'
          ) RETURNING *
        ;`, [req.cookies.id, ]);
          
        })
        .then(({ querySaveDB, responseSend }) => {
          console.log()
          res.send(responseSend);
        })
        .catch(error => console.log("Error: ", error))
    }
  });
  return router;
};
