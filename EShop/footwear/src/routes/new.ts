import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "@rusnvc/common";
import { validateRequest } from "@rusnvc/common";
import { Footwear } from "../models/footwear";
import { FootwearCreatedPublisher } from "../events/publishers/footwear-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/footwear",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Invalid price"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const footwear = Footwear.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await footwear.save();
    await new FootwearCreatedPublisher(natsWrapper.client).publish({
      id: footwear.id,
      title: footwear.title,
      price: footwear.price,
      userId: footwear.userId,
    });

    res.status(201).send(footwear);
  }
);

export { router as createFootwearRouter };
