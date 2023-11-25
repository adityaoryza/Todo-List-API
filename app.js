const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const todos = require('./routes/todoRoutes');
const migration = require('./models/migration');

migration();

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
  })
);

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://www.google.com"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'"],
    fontSrc: ["'self'"],
    frameSrc: ["'self'"],
  },
}));

app.use(cors());
app.use(errorHandler);
app.use('', todos);


const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
