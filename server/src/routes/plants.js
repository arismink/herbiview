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

  router.get("/:term", (req, res) => {
    db.query(
      `SELECT *
      FROM plants
      WHERE lower(plants.name) = $1;`,
      [req.params.term.toLowerCase()]
    )
      .then((data) => {
        const plant_details = data.rows;
        res.json({ plant_details });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};

// // SELECT
// plants.*,
// toxicity.*
// FROM plants
// JOIN toxicity ON plants.id = toxicity.plant_id
// WHERE lower(sci_name) like $1 or lower(common_names) like $1 or lower(name) like $1;
