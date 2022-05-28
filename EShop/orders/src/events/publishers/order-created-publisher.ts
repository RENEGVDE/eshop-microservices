import { Publisher } from "@rusnvc/common";
import { OrderCreatedEvent } from "@rusnvc/common";
import { Channels } from "@rusnvc/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  channel: Channels.OrderCreated = Channels.OrderCreated;
}
