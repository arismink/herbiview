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
<<<<<<< HEAD
const toxicityRoutes = require("./routes/toxicity")
=======
const search = require("./routes/search");
>>>>>>> 499958cfece63610c7055007b85966f416297c4a

// Mount resource routes
App.use("/api/identify", identifyRoutes());
App.use("/api/plants", plantRoutes(db));
App.use("/api/users", usersRoutes(db));
App.use("/api/userHistory", userHistory(db));
<<<<<<< HEAD
App.use("/api/toxicity", toxicityRoutes(db));
=======
App.use("/api/search", search(db));
>>>>>>> 499958cfece63610c7055007b85966f416297c4a

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
