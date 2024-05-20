import express from "express";
import { ProductControllers } from "./product.controllers";

const router = express.Router();

// creating product post
router.post("/create-product", ProductControllers.createProduct);

// get products
router.get("/", ProductControllers.getProducts);

// get single product
router.get("/:productId", ProductControllers.getSingleProduct);

// update product
router.put("/:productId", ProductControllers.updateProduct);

// delete product
router.delete("/:productId", ProductControllers.deleteProduct);

// search product
// router.get("/search", ProductControllers.searchProducts);

//export products routes
export const ProductRoutes = router;
