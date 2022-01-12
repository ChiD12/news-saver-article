import * as Joi from 'joi';

export const articleSchema = Joi.object({
  userId: Joi.string().required(),
  docLink: Joi.string()
    .uri()
    .required(),
  plainText: Joi.string().required()
});
