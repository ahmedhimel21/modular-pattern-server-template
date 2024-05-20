import Product from "../product.model";
import { TProduct } from "./product.interface";

// create product in DB
const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

//get all products data
const getProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

// export
export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
};
