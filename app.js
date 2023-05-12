const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cacheController = require("express-cache-controller");
const compression = require("compression");
require("dotenv").config();

// import routes
const todos = require("./routes/todoRoutes");

// define middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cors());
app.use(
  cacheController({
    maxAge: 60 * 60 * 24, // set cache max age to 1 day
  })
);
app.use(compression());

// routes midleware
app.use("/api", todos);

// define port
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
