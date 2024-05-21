import Order from "../order.model";
import { TOrder } from "./order.interface";

// create order
const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
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
