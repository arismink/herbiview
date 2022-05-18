const router = require("express").Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM plants;`)
      .then((data) => {
        const plants = data.rows;
        res.json({ plants });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id", async (req, res) => {
    const plantQuery = db.query(
      `SELECT *
      FROM plants
      WHERE plants.id = $1;`,
      [req.params.id]
    );

    const toxicityQuery = db.query(
      `SELECT animal, toxic
      FROM toxicity
      WHERE plant_id = $1
      LIMIT 3;`,
      [req.params.id]
    );

    try {
      const [plantResponse, toxicityResponse] = await Promise.all([
        plantQuery,
        toxicityQuery,
      ]);

      const data = {
        ...plantResponse.rows[0],
        toxicities: toxicityResponse.rows
      }

      res.send(data);
    } catch (error) {
      console.log("Error: ", error);
    }
  });

  return router;
};

// // SELECT
// plants.*,
// toxicity.*
// FROM plants
// JOIN toxicity ON plants.id = toxicity.plant_id
// WHERE lower(sci_name) like $1 or lower(common_names) like $1 or lower(name) like $1;

// .then((data) => {
//   const plant_details = data.rows;
//   res.json({ plant_details });
// })
// .catch((err) => {
//   res.status(500).json({ error: err.message });
// });
