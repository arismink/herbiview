const router = require("express").Router();

// Link search results to the user that is logged in

module.exports = (db) => {
  // GET /:id retrieves a selection of user queries
  router.get("/:id", (req, res) => {
    db.query(`
      SELECT * 
      FROM plants
      JOIN user_search_history ON plant_id = plants.id
      WHERE user_id = $1
    ;`, [req.params.id])
    .then(data => {
      const user_history = data.rows;
      res.send({user_history});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
  })

  // POST / retrieves all user queries for a specified user id
  router.post("/", (req, res) => {
    // console.log("POST /api/userHistory,", req.body);
    db.query(`
      SELECT * 
      FROM plants
      JOIN user_search_history ON plant_id = plants.id
      WHERE user_id = $1
    ;`, [req.body.id])
    .then(data => {
      console.log(data.rows)
      const user_history = data.rows;
      res.send({user_history});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
  })

  return router;
}