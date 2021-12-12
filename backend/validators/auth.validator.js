const Joi = require('joi');

const {regExp:{PASSWORD_REGEXP, EMAIL_REGEXP}} = require('../constants');

const authValidator = Joi.object({
    email: Joi
        .string()
        .max(30)
        .required()
        .regex(EMAIL_REGEXP),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
});

const emailValidator = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .lowercase()
        .required(),
});

const passwordValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .min(8)
        .max(128)
        .trim()
        .required()
});

module.exports = {
    authValidator,
    emailValidator,
    passwordValidator,
};
