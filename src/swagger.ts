import swaggerJSDoc, { Options } from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A simple CRUD API application made with Express and documented with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local server',
    },
  ],
};

// Options for the swagger docs
const options: Options = {
  swaggerDefinition,
  apis: ['./src/modules/**/*.route.ts', './src/modules/**/*.model.ts'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
