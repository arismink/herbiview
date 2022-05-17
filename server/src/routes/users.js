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
      const dataObj = data.rows[0];
      req.session.user_id = dataObj.id;

      const user = {
        id: dataObj.id,
        name: dataObj.name,
        cookie: req.session.user_id
      }

      console.log("Logged in as:", user);

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
        const dataObj = data.rows[0];

        const user = {
          id: dataObj.id,
          name: dataObj.name
        }

        console.log("Account created. Logged in as:", user);
        req.session.user_id = user.id;

        res.send(user)

      })
      .catch(err => {
        console.log('Error:', err);
        res
          .status(500)
          .json({error: err.message})
      })
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.send(null)
  })

  router.post("/authenticate", (req, res) => {
    const userID = req.session.user_id;

    db.query(`
      SELECT * FROM USERS WHERE USER_ID = $1;
    `, [userID])
    .then(data => {
      const dataObj = data.rows[0];

      const user = {
        id: dataObj.id,
        name: dataObj.name
      }
      if (data) {
        res.send(user)
      }

    })
    .catch(err => {
      res
      .status(500)
      .json({error: err.message})
    })
  })

  return router;
}