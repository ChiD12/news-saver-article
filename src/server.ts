import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { celebrate, Joi, errors, Segments } from 'celebrate';

require('dotenv').config();

import { router as indexRouter } from './routes';
import { docs } from './docs/docs';

// const expressOasGenerator = require('express-oas-generator');

const app = express();
// expressOasGenerator.handleResponses(app, {});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
app.use(errors());
app.use((error: any, req: any, res: any, next: any) => {
  res.status(400);
  next(error);
});
// expressOasGenerator.handleRequests();

export { app };
