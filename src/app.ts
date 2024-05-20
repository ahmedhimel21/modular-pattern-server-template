import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/product/product.routes";
const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// routes middleware
app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Product management server is running");
});

export default app;
