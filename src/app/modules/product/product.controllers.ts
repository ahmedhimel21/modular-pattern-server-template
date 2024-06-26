import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import { TCustomError } from "./product.interface";
import productValidationSchema from "./product.validation";

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    const { error, value } = productValidationSchema.validate(product);

    // validation
    if (error) {
      throw error as unknown;
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
    const result = await ProductServices.getProductsFromDB(
      searchQuery as string
    );
    // validation
    if (result.length === 0) {
      throw new Error(`Can't find product for ${searchQuery}`);
    }
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
    // validation
    if (!result) {
      throw new Error("Product not found");
    }
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
    // validation
    if (!result.matchedCount) {
      throw new Error("There is no matching product to update!");
    }
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
    // validation
    if (!result.deletedCount) {
      throw new Error("There is no matching product to delete");
    }
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
