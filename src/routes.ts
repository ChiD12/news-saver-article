import * as express from 'express';
import { celebrate, Joi, errors, Segments } from 'celebrate';
import { MongoClient } from 'mongodb';

import { articleSchema } from './schema/schema';
import { createArticleService } from './services';
import { createArticleRepo } from './repo';
import { ArticleInput } from './interfaces/interfaces';

export const router = express.Router();
// const validator = createValidator();

const uri = process.env.MONGO_CONNECTION;
const client = new MongoClient(uri!);
client.connect();
const service = createArticleService(createArticleRepo(client));

router.post('/article', celebrate({ [Segments.BODY]: articleSchema }), async (req, res, next) => {
  const article = req.body as ArticleInput;
  await service.postArticle(article);
  res.status(204).send();
  next();
});

router.get('/article', async (req, res, next) => {
  const allUsers = await service.getAllArticles();
  res.status(200).json(allUsers);
  next();
});
