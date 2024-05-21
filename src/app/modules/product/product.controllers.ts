import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import { TCustomError } from "./product.interface";
import productValidationSchema from "./product.validation";

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    const { error, value } = productValidationSchema.validate(product);

    if (error) {
      throw new Error(error);
    }

    const result = await ProductServices.createProductIntoDB(value);
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't create product",
      error: (error as TCustomError).message,
    });
  }
};

// get products
const getProducts = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.searchTerm;
    if (!searchQuery) {
      throw new Error("Product not found!");
    }
    const result = await ProductServices.getProductsFromDB(
      searchQuery as string
    );
    res.status(200).json({
      success: true,
      message: searchQuery
        ? `Products matching search term ${searchQuery} fetched successfully!`
        : `Products fetched successfully!`,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't retrieved products",
      error: (error as TCustomError).message,
    });
  }
};

// get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't retrieved products",
      error: (error as TCustomError).message,
    });
  }
};

// update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.updateProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to update product!",
      error: (error as TCustomError).message,
    });
  }
};

// delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to delete product!",
      error: (error as TCustomError).message,
    });
  }
};

// export
export const ProductControllers = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
