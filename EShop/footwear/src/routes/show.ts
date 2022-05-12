import { NotFoundError } from "@rusnvc/common";
import express, { Request, Response, Router } from "express";
import { Footwear } from "../models/footwear";

const router = express.Router();

router.get("/api/footwear/:id", async (req: Request, res: Response) => {
  const footwear = await Footwear.findById(req.params.id);

  if (!footwear) {
    throw new NotFoundError();
  }

  res.send(footwear);
});

export { router as showFootwearRouter };
