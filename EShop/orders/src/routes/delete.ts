import {
  NotAuthorizedEroor,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@rusnvc/common";
import express, { Request, Response } from "express";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { Order } from "../models/order";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("footwear");

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedEroor();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      footwear: {
        id: order.footwear.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
