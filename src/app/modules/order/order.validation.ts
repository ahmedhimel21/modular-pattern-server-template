import Joi from "joi";

// Define Joi schema for order data validation
const orderValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  productId: Joi.string().required().messages({
    "string.base": "ProductId must be a string",
    "string.empty": "ProductId is required",
    "any.required": "ProductId is required",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be a non-negative number",
    "any.required": "Price is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
});

export default orderValidationSchema;
