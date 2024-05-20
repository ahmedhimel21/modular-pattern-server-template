import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import { TCustomError } from "./product.interface";

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const result = await ProductServices.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't create product",
      data: (error as TCustomError).message,
    });
  }
};

// export
export const ProductControllers = {
  createProduct,
};
