import express from "express";
import { OrderControllers } from "./order.controllers";

const router = express.Router();

// create order route
router.post("/", OrderControllers.createOrder);

// export
export const OrderRoutes = router;
