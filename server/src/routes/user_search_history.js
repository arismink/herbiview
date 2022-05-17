const router = require("express").Router();

// Link search results to the user that is logged in
// Route currently returns ALL user search_history. need to modify accordingly

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
      SELECT * FROM user_search_history 
      JOIN users ON user_id = users.id
      WHERE email = $1
      LIMIT 5;
    `, [req.data.email])
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