const router = require("express").Router();

module.exports = (db) => {

  router.get("/:term", (req, res) => {
    db.query(
      `SELECT DISTINCT plants.id, plants.name, plants.sci_name
      FROM plants
      WHERE lower(sci_name) like $1 or lower(common_names) like $1 or lower(name) like $1;`,
      [`%${req.params.term.toLowerCase()}%`]
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