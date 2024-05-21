import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import { TCustomError } from "../product/product.interface";
import orderValidationSchema from "./order.validation";

//create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;

    const { error, value } = orderValidationSchema.validate(order);

    if (error) {
      throw new Error(error);
    }

    const result = await OrderServices.createOrderIntoDB(value);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create data",
      error: (error as TCustomError).message,
    });
  }
};

// get order data
const getOrder = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.email;
    if (!searchQuery) {
      throw new Error("Order not found!");
    }
    const result = await OrderServices.getOrderFromDB(searchQuery as string);
    res.status(200).json({
      success: true,
      message: searchQuery
        ? `Orders fetched successfully for user ${searchQuery}!`
        : `Orders fetched successfully!`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't fetched order!",
      error: (error as TCustomError).message,
    });
  }
};

// export
export const OrderControllers = {
  createOrder,
  getOrder,
};
