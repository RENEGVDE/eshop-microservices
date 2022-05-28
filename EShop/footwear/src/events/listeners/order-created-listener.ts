import { Message } from "node-nats-streaming";
import { Channels, Listener, OrderCreatedEvent } from "@rusnvc/common";
import { queueGroupName } from "./queue-group-name";
import { Footwear } from "../../models/footwear";
import { FootwearUpdatedPublisher } from "../publishers/footwear-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  channel: Channels.OrderCreated = Channels.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const footwear = await Footwear.findById(data.footwear.id);

    if (!footwear) {
      throw new Error("Footwear not found");
    }

    footwear.set({ orderId: data.id });

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
