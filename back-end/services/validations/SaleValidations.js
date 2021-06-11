const Joi = require('joi');

const validateData = (data) =>
  Joi.object({
    productName: Joi.string().required(), 
    quantity: Joi.number().min(1).required(),
    deliveryAddress: Joi.string().required(), 
    deliveryNumber: Joi.number().optional(),
    totalPrice: Joi.number().optional(),
    status: Joi.string().optional(),
  }).validate(data);

const validateStatus = (status) => 
  Joi.string().valid('Pendente', 'Entregue', 'Preparando').required().validate(status);

module.exports = {
  validateData,
  validateStatus,
};