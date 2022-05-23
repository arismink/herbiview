const router = require("express").Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/login", (req, res) => {
    db.query(`SELECT * FROM users WHERE email = $1 AND password_digest = $2;`, [
      req.body.email,
      req.body.password,
    ])
      .then((data) => {
        const dataObj = data.rows[0];

        const user = {
          id: dataObj.id,
          name: dataObj.name,
        };

        console.log("Logged in as:", user);

        res.send(user);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/register", (req, res) => {
    db.query(
      `
      INSERT INTO users (name, email, password_digest)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
      [req.body.name, req.body.email, req.body.password]
    )
      .then((data) => {
        const dataObj = data.rows[0];

        const user = {
          id: dataObj.id,
          name: dataObj.name,
        };

        console.log("Account created. Logged in as:", user);

        res.send(user);
      })
      .catch((err) => {
        console.log("Error:", err.message);
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};