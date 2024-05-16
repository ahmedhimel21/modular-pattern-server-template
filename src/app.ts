import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Mongoose server");
});

export default app;
