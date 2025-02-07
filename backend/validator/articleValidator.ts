import Joi from "joi";

export const validateArticle = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(10).required(),
    categories: Joi.alternatives().try(
        Joi.string().min(3),
        Joi.array().items(Joi.string().min(3))
    ).required(),
    author: Joi.string().min(3).max(30).required()
});