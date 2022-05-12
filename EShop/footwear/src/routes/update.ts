import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedEroor,
} from "@rusnvc/common";
import { Footwear } from "../models/footwear";
import { FootwearUpdatedPublisher } from "../events/publishers/footwear-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/footwear/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title required"),
    body("price").isFloat({ gt: 0 }).withMessage("Invalid Price"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const footwear = await Footwear.findById(req.params.id);

    if (!footwear) {
      throw new NotFoundError();
    }

    if (footwear.userId !== req.currentUser!.id) {
      throw new NotAuthorizedEroor();
    }

    footwear.set({
      title: req.body.title,
      price: req.body.price,
    });
    await footwear.save();
    await new FootwearUpdatedPublisher(natsWrapper.client).publish({
      id: footwear.id,
      title: footwear.title,
      price: footwear.price,
      userId: footwear.userId,
    });

    res.send(footwear);
  }
);

export { router as updatedFootwearRouter };
