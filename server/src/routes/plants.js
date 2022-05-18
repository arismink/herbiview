const router = require("express").Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM plants;`)
    .then(data => {
      const plants = data.rows;
      res.json({plants})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
  })

  router.get("/:id", (req, res) => {
    db.query(`
      SELECT
        plants.*, toxicity.*
      FROM plants
      JOIN toxicity ON plants.id = toxicity.plant_id
      WHERE plants.id = $1;`, [req.params.id]
    )
      .then((data) => {
        const plant_details = data.rows;
        res.json({plant_details});
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });

  })

  return router;
}