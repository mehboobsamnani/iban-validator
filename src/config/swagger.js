const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A Simple Express Library API'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api/v1`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/api/*.js'], // files containing annotations as above
};
const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUIServe: swaggerUI.serve,
  swaggerUISetup: swaggerUI.setup(specs)
};
