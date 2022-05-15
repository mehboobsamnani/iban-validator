const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const { swaggerUIServe, swaggerUISetup } = require('./config/swagger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Server online.');
});

app.use('/api/v1', api);
app.use('/docs', swaggerUIServe, swaggerUISetup);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
