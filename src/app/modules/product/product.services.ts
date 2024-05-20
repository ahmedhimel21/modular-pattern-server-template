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

// get specific single product
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  return result;
};

// update document
const updateProductFromDB = async (id: string) => {
  const result = await Product.updateOne(
    { _id: id },
    { $inc: { "inventory.quantity": -1 } }
  );
  return result;
};

// export
export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
};
