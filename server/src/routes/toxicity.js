const router = require("express").Router();

module.exports = (db) => {

  router.get("/:term", (req, res) => {
    db.query(
      `SELECT toxicity.animal, toxicity.toxic, toxicity.clinical_signs
      FROM plants
      JOIN toxicity ON plants.id = toxicity.plant_id
      WHERE lower(sci_name) like $1 or lower(common_names) like $1 or lower(name) like $1
      LIMIT 3;`,
      [`%${req.params.term.toLowerCase()}%`]
    )
      .then((data) => {
        const toxicity_details = data.rows;

        res.send(toxicity_details);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};