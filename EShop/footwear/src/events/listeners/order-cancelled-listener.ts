import { Channels, Listener, OrderCancelledEvent } from "@rusnvc/common";
import { Message } from "node-nats-streaming";
import { Footwear } from "../../models/footwear";
import { FootwearUpdatedPublisher } from "../publishers/footwear-updated-publisher";
import { queueGroupName } from "./queue-group-name";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  channel: Channels.OrderCancelled = Channels.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const footwear = await Footwear.findById(data.footwear.id);

    if (!footwear) {
      throw new Error("Footwear not found");
    }

    footwear.set({ orderId: undefined });
    await footwear.save();

    await new FootwearUpdatedPublisher(this.client).publish({
      id: footwear.id,
      price: footwear.price,
      title: footwear.title,
      userId: footwear.userId,
      orderId: footwear.orderId,
      version: footwear.version,
    });

    msg.ack();
  }
}
