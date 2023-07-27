const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cacheController = require('express-cache-controller');
const compression = require('compression');
require('dotenv').config();
// note caching using express-api-cache
var cacheService = require('express-api-cache');
var cache = cacheService.cache;

// import routes
const todos = require('./routes/todoRoutes');

// define middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
  })
);
app.use(cors());
app.use(
  cacheController({
    maxAge: 60 * 60 * 24, // set cache max age to 1 day
  })
);

app.use(
  compression({
    level: 6,
    threshold: 10 * 1000,
    filter: (req, res) => {
      if (req.headers['x-no-comprehension']) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// routes middleware
app.use('', todos);

// define port
const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
