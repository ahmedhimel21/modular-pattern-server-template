// import { z } from "zod";

import Joi from "joi";

// // TVariants schema
// const variantValidationSchema = z.object({
//   type: z.string().min(1, { message: "Type is required" }),
//   value: z.string().min(1, { message: "Value is required" }),
// });

// // TInventory schema
// const inventoryValidationSchema = z.object({
//   quantity: z
//     .number()
//     .int()
//     .min(0, { message: "Quantity must be a non-negative integer" }),
//   inStock: z.boolean({ required_error: "InStock is required" }),
// });

// // TProduct schema
// const productValidationSchema = z.object({
//   name: z.string().min(1, { message: "Name is required" }),
//   description: z.string().min(1, { message: "Description is required" }),
//   price: z.number().min(0, { message: "Price must be a non-negative number" }),
//   category: z.string().min(1, { message: "Category is required" }),
//   tags: z
//     .array(z.string().min(1, { message: "Tag must be a non-empty string" }))
//     .min(1, { message: "Tags must contain at least one tag" }),
//   variants: z
//     .array(variantValidationSchema)
//     .min(1, { message: "Variants must contain at least one variant" }),
//   inventory: inventoryValidationSchema,
// });

// export default productValidationSchema;

// TVariants schema
const variantValidationSchema = Joi.object({
  type: Joi.string().min(1).required().messages({
    "string.base": "Type must be a string",
    "string.empty": "Type is required",
    "any.required": "Type is required",
  }),
  value: Joi.string().min(1).required().messages({
    "string.base": "Value must be a string",
    "string.empty": "Value is required",
    "any.required": "Value is required",
  }),
});

// TInventory schema
const inventoryValidationSchema = Joi.object({
  quantity: Joi.number().integer().min(0).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be a non-negative integer",
    "any.required": "Quantity is required",
  }),
  inStock: Joi.boolean().required().messages({
    "boolean.base": "InStock must be a boolean",
    "any.required": "InStock is required",
  }),
});

// TProduct schema
const productValidationSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  description: Joi.string().min(1).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be a non-negative number",
    "any.required": "Price is required",
  }),
  category: Joi.string().min(1).required().messages({
    "string.base": "Category must be a string",
    "string.empty": "Category is required",
    "any.required": "Category is required",
  }),
  tags: Joi.array()
    .items(
      Joi.string().min(1).required().messages({
        "string.base": "Tag must be a string",
        "string.empty": "Tag must be a non-empty string",
        "any.required": "Tag is required",
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Tags must be an array",
      "array.min": "Tags must contain at least one tag",
      "any.required": "Tags are required",
    }),
  variants: Joi.array()
    .items(variantValidationSchema)
    .min(1)
    .required()
    .messages({
      "array.base": "Variants must be an array",
      "array.min": "Variants must contain at least one variant",
      "any.required": "Variants are required",
    }),
  inventory: inventoryValidationSchema.required().messages({
    "any.required": "Inventory is required",
  }),
});

export default productValidationSchema;
