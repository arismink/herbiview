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

  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1 AND password_digest = $2;`, [req.body.email, req.body.password])
    .then(data => {
      const user = data.rows[0];
      console.log("Logged in as:", user);

      // req.session.user_id = user.id;
      // return to home page
      res.send(user);

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    })
  });

  router.post("/register", (req, res) => {
    db.query(`
      INSERT INTO users (name, email, password_digest)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [req.body.name, req.body.email, req.body.password]
    )
      .then((data) => {
        const user = data.rows[0]
        res.send(user)

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