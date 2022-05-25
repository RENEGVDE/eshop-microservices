import {
  Channels,
  Listener,
  OrderCreatedEvent,
} from "@rusnvc/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queue-group-names";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  channel: Channels.OrderCreated = Channels.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
