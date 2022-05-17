const router = require("express").Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
    .then(data => {
      const users = data.rows;
      res.json({users});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
  });

  router.get("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [req.body.email, req.body.password])
    .then(data => {
      const user = data.rows[0];
      console.log("Logged in as:", user);
      // return to home page
      return user;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message })
    })
  });

  router.post("/register", (req, res) => {
    db.query(`
      INSERT INTO users (name, email, password_digest)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [req.body.name, req.body.email, req.body.password]
    )
      .then(() => {
        res.redirect("/");
        console.log(res.req.body)

      })
      .catch(err => {
        console.log('Error:', err);
        res
          .status(500)
          .json({error: err.message})
      })
  })

  return router;
}