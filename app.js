const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware'); // Import the error handler middleware
require('dotenv').config();

// Import routes
const todos = require('./routes/todoRoutes');

// Define middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '5mb',
    extended: true,
  })
);
app.use(cors());

// Routes middleware
app.use('', todos);

// Error handling middleware
app.use(errorHandler); // Use the error handling middleware

// Define port
const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
