require("dotenv").config();

const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js")
const db = new Pool(dbParams);
db.connect();

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json({ limit: "50mb" }));
App.use(cors());
App.use(Express.static("public"));

// Routes
const identifyRoutes = require("./routes/identify");
const getUsersRoutes = require("./routes/users");

// Mount resource routes
App.use("/api/identify", identifyRoutes());

App.use("/api/users", getUsersRoutes(db));

// Sample GET route
App.get("/api/data", (req, res) => {
  console.log("GET /api/data");
  res.json({
    message: "Seems to work kinda!",
  });
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
