const Joi = require('joi');

const {regExp: {EMAIL_REGEXP, PASSWORD_REGEXP}} = require('../constants');

const addUser_validator = Joi.object({
    email: Joi
        .string()
        .regex(EMAIL_REGEXP)
        .required()
        .trim(),
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim(),
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    age: Joi
        .number()
});

const updateUserValidator = Joi.object({
    password: Joi
        .string()
        .regex(PASSWORD_REGEXP)
        .required()
        .trim(),
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    age: Joi
        .number()

});

module.exports = {
    addUser_validator,
    updateUserValidator
};
