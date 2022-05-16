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

  return router;
}