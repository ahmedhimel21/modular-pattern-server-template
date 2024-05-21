import { Request, Response } from "express";
import { OrderServices } from "./order.services";
import { TCustomError } from "../product/product.interface";

//create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const result = await OrderServices.createOrderIntoDB(order);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to create data",
      data: (error as TCustomError).message,
    });
  }
};

// get order data
const getOrder = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.email;
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
      data: (error as TCustomError).message,
    });
  }
};

// export
export const OrderControllers = {
  createOrder,
  getOrder,
};
