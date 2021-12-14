const Joi = require('joi');

const {regExp: {EMAIL_REGEXP, PASSWORD_REGEXP}, userRole} = require('../constants');

const addUser_validator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .trim()
        .required(),
    username: Joi
        .string()
        .alphanum()
        .min(2)
        .max(20)
        .trim()
        .required(),
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
    city: Joi
        .string(),
    avatarPicture: Joi
        .string(),
    coverPicture: Joi
        .string(),
    role: Joi
        .string()
        .allow(...Object.values(userRole))
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    city: Joi
        .string(),
    avatarPicture: Joi
        .string(),
    coverPicture: Joi
        .string(),
    role: Joi
        .string()
        .allow(...Object.values(userRole))
});

module.exports = {
    addUser_validator,
    updateUserValidator
};
