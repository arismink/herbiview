require("dotenv").config();

const Express = require("express");
const App = Express();
const PORT = process.env.PORT || 8080;

const morgan = require("morgan");
const BodyParser = require("body-parser");
const cors = require("cors");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js")
const db = new Pool(dbParams);
db.connect();

App.use(morgan("dev"));


// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json({ limit: "50mb" }));
App.use(cors());
App.use(Express.static("public"));

// Routes
const identifyRoutes = require("./routes/identify");
const usersRoutes = require("./routes/users");
const plantRoutes = require("./routes/plants");
const userHistory = require("./routes/user_search_history");
const toxicityRoutes = require("./routes/toxicity")
const search = require("./routes/search");

// Mount resource routes
App.use("/api/identify", identifyRoutes());
App.use("/api/plants", plantRoutes(db));
App.use("/api/users", usersRoutes(db));
App.use("/api/userHistory", userHistory(db));
App.use("/api/toxicity", toxicityRoutes(db));
App.use("/api/search", search(db));

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
