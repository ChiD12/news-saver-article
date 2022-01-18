import express from 'express';
import swaggerUi from 'swagger-ui-express';
import jwt from 'jsonwebtoken';
import { errors } from 'celebrate';

require('dotenv').config();

import { router as indexRouter } from './routes';
import { docs } from './docs/docs';

// const expressOasGenerator = require('express-oas-generator');

const app = express();
// expressOasGenerator.handleResponses(app, {});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

app.use((req: any, res: any, next: any) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(403).send('A token is required');
  try {
    const decoded: any = jwt.verify(authorization, process.env.JWT_KEY!);
    console.log(decoded);
    req.body.userId = decoded.userId;
    req.body.sentFromDeviceId = decoded.externalDeviceId;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  next();
});

app.use('/', indexRouter);
app.use(errors());
app.use((error: any, req: any, res: any, next: any) => {
  res.status(400);
  next(error);
});
// expressOasGenerator.handleRequests();

export { app };
