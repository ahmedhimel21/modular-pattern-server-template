import Order from "../order.model";
import Product from "../product.model";
import { TOrder } from "./order.interface";

// create order
const createOrderIntoDB = async (order: TOrder) => {
  // create order
  const result = await Order.create(order);
  // find order
  const product = await Product.findOne({ _id: order.productId });
  // product not found validation
  if (!product) {
    throw new Error("Product not found");
  }
  // available quantity validation
  const availableQuantity = product.inventory.quantity;
  if (order.quantity > availableQuantity) {
    throw new Error("Insufficient quantity available in inventory");
  }
  // update inventory
  await Product.updateOne(
    { _id: order.productId },
    { $inc: { "inventory.quantity": -order.quantity } }
  );
  // update stock status
  await Product.updateOne(
    { _id: order.productId, "inventory.quantity": { $eq: 0 } },
    { $set: { "inventory.inStock": false } }
  );
  return result;
};

// get order data
const getOrderFromDB = async (email: string) => {
  if (email) {
    const result = await Order.find({ email: email });
    return result;
  }
  const result = await Order.find();
  return result;
};

// export
export const OrderServices = {
  createOrderIntoDB,
  getOrderFromDB,
};
