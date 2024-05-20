import { model, Schema } from "mongoose";

// TOrder schema
const orderSchema = new Schema({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Order model
const Order = model("Order", orderSchema);

export default Order;
