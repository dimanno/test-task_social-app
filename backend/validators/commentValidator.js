const joi = require('joi');

const commentValidator = joi.object({
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
