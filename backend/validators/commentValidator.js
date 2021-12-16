const joi = require('joi');

const {regExp:{EMAIL_REGEXP}} = require('../constants');

const commentValidator = joi.object({
    email: joi
        .string()
        .required()
        .trim()
        .regex(EMAIL_REGEXP),
    body: joi
        .string()
        .min(5)
        .max(300)
        .required(),
    post_id: joi
        .string()
});

module.exports = {
    commentValidator
};
