import express from "express";
import { OrderControllers } from "./order.controllers";

const router = express.Router();

// create order route
router.post("/", OrderControllers.createOrder);

// get order data
router.get("/", OrderControllers.getOrder);

// export
export const OrderRoutes = router;
