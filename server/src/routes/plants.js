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

  router.get("/:term", (req, res) => {
    db.query(`
      SELECT
        plants.*,
        toxicity.*
      FROM plants
      JOIN toxicity ON plants.id = toxicity.plant_id
      WHERE ;`, [req.params.id]
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

// select plants.*, toxicity.* from plants join toxicity on plant_id = plants.id where sci_name like '%can%' or common_names like '%can%' or name like '%can%';
