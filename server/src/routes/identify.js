const router = require("express").Router();
const axios = require("axios");
const mockIdentifyData = require("../mockData/mockIdentifyData.json");
const mockHeathData = require("../mockData/mockHealthData.json");
const identifyData = require("../helpers/identifyData.js");
const healthData = require("../helpers/healthData.js");

module.exports = (db) => {

  // router.get("/", (req, res) => {
  //   const userCookie = req.cookies.credentials;
  //   const parsedCookie = userCookie ? JSON.parse(userCookie) : undefined;
  //   console.log("Checking cookie exists:", parsedCookie ? true : false);
  // })

  router.post("/", async (req, res) => {
    /*
      MODIFY THIS VALUE TO USE LIVE API OR MOCK API
    */
    const useMockData = false;

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
        .then(([ identifyResponse, healthResponse ]) => {
          // Create object to send back to client
          const resSend = {
            ...identifyData(identifyResponse.data),
            ...healthData(healthResponse.data),
          };

          // Get cookie id, and do not INSERT into db if not logged in
          const userCookie = req.cookies.credentials;
          const parsedCookie = userCookie ? JSON.parse(userCookie) : undefined;
          // If no user logged in, get out
          if (!userCookie) {
            return Promise.all([" ", resSend]);
          }

          // Set up axios query POST to db, to find plant id
          const querySaveDB = db.query(`
            INSERT INTO user_search_history
            (user_id, plant_id, sci_name, description, info_url, user_img_url, common_names, date)
            VALUES (
              $1,
              (SELECT id FROM plants
                WHERE LOWER(name) LIKE $8 OR
                  LOWER(sci_name) LIKE $9 OR
                  LOWER(common_names) LIKE $8
                LIMIT 1),
              $2, $3, $4, $5, $6, $7
            ) RETURNING *
          ;`, [
            parsedCookie.id,
            resSend.sci_name,
            resSend.description,
            resSend.info_url,
            resSend.image_url,
            resSend.common_names,
            resSend.date,
            `%${resSend.plant_name.toLowerCase()}%`,
            `%${resSend.sci_name.toLowerCase()}%`
          ]);
          // Pass both the db insert and the values to send back to client
          return Promise.all([querySaveDB, resSend]);
        })
        .then(([ querySaveDB, resSend ]) => {
          // Send plant.id results to client to display in plant-detail
          res.send(resSend);
        })
        .catch(error => console.log("Error in /api/identify: ", error))
    }
  });
  return router;
};
