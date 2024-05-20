import express from "express";
import { ProductControllers } from "./product.controllers";

const router = express.Router();

// creating product post
router.post("/create-product", ProductControllers.createProduct);

// get products
router.get("/", ProductControllers.getProducts);

//export products routes
export const ProductRoutes = router;
