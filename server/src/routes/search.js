const router = require("express").Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`
      SELECT DISTINCT plants.id, plants.name, plants.sci_name
      FROM plants
      ;`
    )
    .then(data => {
      const plant_details = data.rows;
      res.send(plant_details);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })

  router.get("/:term", (req, res) => {
    db.query(`
      SELECT DISTINCT plants.id, plants.name, plants.sci_name
      FROM plants
      WHERE lower(sci_name) LIKE $1 
        OR lower(common_names) LIKE $1 
        OR lower(name) LIKE $1
      ;`,
      [`%${req.params.term.toLowerCase()}%`]
    )
      .then((data) => {
        const plant_details = data.rows;
        res.send(plant_details);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};