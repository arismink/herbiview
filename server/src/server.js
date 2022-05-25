require("dotenv").config();

const Express = require("express");
const path = require("path");
const App = Express();
const PORT = process.env.PORT || 4000;

const morgan = require("morgan");
const BodyParser = require("body-parser");
const cors = require("cors");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js")
const db = new Pool(dbParams);
db.connect();

// Morgan middleware
App.use(morgan("dev"));

// Cookie middleware
const cookieParser = require('cookie-parser');
App.use(cookieParser());

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json({ limit: "50mb" }));
App.use(cors());
App.use(Express.static("build"));

// Routes
const identifyRoutes = require("./routes/identify");
const usersRoutes = require("./routes/users");
const plantRoutes = require("./routes/plants");
const userHistory = require("./routes/user_search_history");
const toxicityRoutes = require("./routes/toxicity")
const search = require("./routes/search");

// Mount resource routes
App.use("/api/identify", identifyRoutes(db));
App.use("/api/plants", plantRoutes(db));
App.use("/api/users", usersRoutes(db));
App.use("/api/userHistory", userHistory(db));
App.use("/api/toxicity", toxicityRoutes(db));
App.use("/api/search", search(db));

// serve static files in ../build
const public = path.join(__dirname, '../..', 'public');
App.use(Express.static(public));

App.listen(PORT, () => {

// eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`);

});
