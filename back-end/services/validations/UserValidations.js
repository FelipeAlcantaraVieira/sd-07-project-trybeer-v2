const Joi = require('joi');

const validateUserData = (data) =>
  Joi.object({
    name: Joi.string().regex(/^[a-z ,.'-]+$/i).min(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('client', 'administrator').required(),
  }).validate(data);

const validadeUserName = (data) =>
  Joi.object({
    name: Joi.string().regex(/^[a-z ,.'-]+$/i).min(12).required(),
  }).validate(data);

module.exports = {
  validateUserData,
  validadeUserName,
};