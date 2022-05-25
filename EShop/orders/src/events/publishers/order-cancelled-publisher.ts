import { Publisher } from "@rusnvc/common";
import { OrderCancelledEvent } from "@rusnvc/common";
import { Channels } from "@rusnvc/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  channel: Channels.OrderCancelled = Channels.OrderCancelled;
}
