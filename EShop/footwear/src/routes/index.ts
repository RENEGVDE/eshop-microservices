import express, { Request, Response } from "express";
import { Footwear } from "../models/footwear";

const router = express.Router();

router.get("/api/footwear", async (req: Request, res: Response) => {
  const footwear = await Footwear.find({});

  res.send(footwear);
});

export { router as indexFootwearRouter };
