import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.routes";
import { OrderRoutes } from "./app/modules/order/order.routes";
const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// products routes middleware
app.use("/api/products", ProductRoutes);

// orders routes middleware
app.use("/api/orders", OrderRoutes);

// not found route
app.all("*", (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Product management server is running");
});

export default app;
