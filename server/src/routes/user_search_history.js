const router = require("express").Router();

// Link search results to the user that is logged in

module.exports = (db) => {
  // GET / retrieves a selection of user queries
  router.get("/", (req, res) => {
    db.query(`
      SELECT * 
      FROM user_search_history 
      JOIN users ON user_id = users.id
      LIMIT 5
    ;`)
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

  // GET /:id retrieves a selection of user queries
  router.get("/:id", (req, res) => {
    db.query(`
      SELECT * 
      FROM user_search_history 
      JOIN users ON user_id = users.id
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
    console.log("GET /api/userHistory, id is", req.body);
    db.query(`
      SELECT * 
      FROM user_search_history 
      JOIN plants ON plant_id = plants.id
      WHERE user_id = $1
    ;`, [req.body.id])
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

  return router;
}