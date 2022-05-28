import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from "@rusnvc/common";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { Footwear } from "../models/footwear";
import { Order } from "../models/order";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [body("footwearId").not().isEmpty().withMessage("Footwear ID not provided")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { footwearId } = req.body;

    const footwear = await Footwear.findById(footwearId);
    if (!footwear) {
      throw new NotFoundError();
    }

    const isReserved = await footwear.isReserved();
    if (isReserved) {
      throw new BadRequestError("Footwear reserved");
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 4 * 60);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      footwear,
    });
    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      footwear: {
        id: footwear.id,
        price: footwear.price,
      },
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
