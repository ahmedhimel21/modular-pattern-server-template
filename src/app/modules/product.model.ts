import { model, Schema } from "mongoose";

// TVariants schema
const variantSchema = new Schema(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

//  TInventory schema
const inventorySchema = new Schema(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false }
);

// TProduct schema
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

//  Product model
const Product = model("Product", productSchema);

export default Product;
